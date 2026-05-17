'use client';

import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, Trash2, AlertCircle } from 'lucide-react';
import { cn, formatFileSize, isAllowedFileType } from '@/lib/utils';

interface DropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export const Dropzone = ({
  files,
  onChange,
  maxFiles = 5,
  maxSizeMB = 10,
}: DropzoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const validateAndAddFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    setError(null);
    const validFilesList: File[] = [...files];
    const totalFilesAfterAdding = files.length + newFiles.length;

    if (totalFilesAfterAdding > maxFiles) {
      setError(`Solo se permite subir un máximo de ${maxFiles} archivos.`);
      return;
    }

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];

      // Validar tipo
      if (!isAllowedFileType(file)) {
        setError(`El archivo "${file.name}" no es un tipo permitido (JPG, PNG, WEBP, PDF, DWG).`);
        return;
      }

      // Validar tamaño (convertido a bytes)
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`El archivo "${file.name}" supera el tamaño máximo de ${maxSizeMB}MB.`);
        return;
      }

      // Evitar duplicados por nombre y tamaño
      const isDuplicate = validFilesList.some(
        (f) => f.name === file.name && f.size === file.size
      );

      if (!isDuplicate) {
        validFilesList.push(file);
      }
    }

    onChange(validFilesList);
  }, [files, maxFiles, maxSizeMB, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    validateAndAddFiles(e.dataTransfer.files);
  }, [validateAndAddFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndAddFiles(e.target.files);
  }, [validateAndAddFiles]);

  const removeFile = useCallback((indexToRemove: number) => {
    const updatedFiles = files.filter((_, idx) => idx !== indexToRemove);
    onChange(updatedFiles);
    setError(null);
  }, [files, onChange]);

  return (
    <div className="w-full space-y-4">
      <span className="label-form">ADJUNTA REFERENCIAS (OPCIONAL)</span>
      
      {/* Dropzone container */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'relative border border-dashed p-6 text-center cursor-pointer transition-all duration-200 min-h-[140px] flex flex-col justify-center items-center',
          isDragActive 
            ? 'border-sand bg-sand/5' 
            : 'border-border hover:border-sand-muted hover:bg-stone-dark/30'
        )}
      >
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf,.dwg"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <UploadCloud size={32} className={cn('mb-3 transition-colors duration-200', isDragActive ? 'text-sand' : 'text-cream/50')} />
        <p className="text-xs font-semibold uppercase tracking-widest text-cream/90 mb-1">
          {isDragActive ? 'Suelta los archivos aquí' : 'Arrastra archivos aquí o haz clic'}
        </p>
        <p className="text-[10px] text-cream/40 uppercase tracking-wider">
          Planos, imágenes o ideas (Máx. {maxFiles} archivos de 10MB c/u. JPG, PNG, PDF, DWG)
        </p>
      </div>

      {/* Mensaje de error local */}
      {error && (
        <div className="flex items-start gap-2 bg-red-950/20 border border-red-900/50 p-3">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-red-300 font-semibold leading-normal uppercase tracking-wider">
            {error}
          </p>
        </div>
      )}

      {/* Lista de archivos seleccionados */}
      {files.length > 0 && (
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between p-3 bg-stone border border-border group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText size={18} className="text-sand shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-cream truncate uppercase tracking-wider">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-cream/40 uppercase">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="text-cream/40 hover:text-red-400 p-1.5 transition-colors duration-200"
                aria-label={`Eliminar archivo ${file.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
