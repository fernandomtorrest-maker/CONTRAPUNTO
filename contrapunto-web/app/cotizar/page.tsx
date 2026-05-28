import { Suspense } from 'react';
import CotizadorContrapunto from '@/components/sections/CotizadorContrapunto';

export const metadata = {
  title: 'Cotizar Proyecto | Contrapunto Constructora',
  description: 'Cotiza tu proyecto de construcción en madera con Contrapunto. Casas nuevas, quinchos, terrazas y tiny houses.',
};

export default function CotizarPage() {
  return (
    <div className="bg-[#1b1b1b] min-h-screen">
      <Suspense>
        <CotizadorContrapunto />
      </Suspense>
    </div>
  );
}
