import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';

const FORUM_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'forum_posts.json');

export interface ForumComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  author: string;
  category: 'Urgente' | 'Precios & Cotizaciones' | 'Obras e Inspecciones' | 'General';
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  comments: ForumComment[];
}

function readPosts(): ForumPost[] {
  try {
    if (!fs.existsSync(FORUM_FILE_PATH)) {
      fs.writeFileSync(FORUM_FILE_PATH, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(FORUM_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function savePosts(posts: ForumPost[]): boolean {
  try {
    fs.writeFileSync(FORUM_FILE_PATH, JSON.stringify(posts, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}

// GET: Obtener publicaciones del foro
export async function GET() {
  const posts = readPosts();
  // Ordenar fijados primero, luego por fecha descendente
  posts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return NextResponse.json({ success: true, posts });
}

// POST: Crear publicación o comentario
export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const userPayload = token ? await verifyAdminToken(token) : null;

  if (!userPayload) {
    return NextResponse.json({ success: false, error: 'No autorizado. Inicie sesión.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const posts = readPosts();

    // Caso 1: Agregar comentario a un post existente
    if (body.type === 'comment') {
      const { postId, content } = body;
      if (!postId || !content?.trim()) {
        return NextResponse.json({ success: false, error: 'Se requiere el contenido del comentario.' }, { status: 400 });
      }

      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        return NextResponse.json({ success: false, error: 'Publicación no encontrada.' }, { status: 404 });
      }

      const newComment: ForumComment = {
        id: `comm-${Date.now()}`,
        author: userPayload.user,
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };

      posts[postIndex].comments.push(newComment);
      savePosts(posts);

      return NextResponse.json({ success: true, comment: newComment });
    }

    // Caso 2: Crear una nueva publicación
    const { title, content, category = 'General', isPinned = false } = body;
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ success: false, error: 'Se requiere título y contenido.' }, { status: 400 });
    }

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: userPayload.user,
      category: category || 'General',
      title: title.trim(),
      content: content.trim(),
      isPinned: Boolean(isPinned),
      createdAt: new Date().toISOString(),
      comments: [],
    };

    posts.unshift(newPost);
    savePosts(posts);

    return NextResponse.json({ success: true, post: newPost });
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno al guardar en el foro.' }, { status: 500 });
  }
}

// PUT: Alternar fijado de aviso
export async function PUT(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ success: false, error: 'No autorizado.' }, { status: 401 });
  }

  try {
    const { postId } = await request.json();
    const posts = readPosts();
    const postIndex = posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json({ success: false, error: 'Post no encontrado.' }, { status: 404 });
    }

    posts[postIndex].isPinned = !posts[postIndex].isPinned;
    savePosts(posts);

    return NextResponse.json({ success: true, isPinned: posts[postIndex].isPinned });
  } catch {
    return NextResponse.json({ success: false, error: 'Error al actualizar.' }, { status: 500 });
  }
}
