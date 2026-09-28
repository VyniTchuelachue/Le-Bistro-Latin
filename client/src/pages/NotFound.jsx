import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PalmMark } from '../components/Logo.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Page introuvable');
  return (
    <section className="flex min-h-[80vh] items-center bg-ink pt-24 text-center text-cream">
      <div className="container-x">
        <PalmMark className="mx-auto h-14 w-14 text-gold" />
        <p className="mt-6 font-serif text-7xl text-gold">404</p>
        <h1 className="mt-4 font-serif text-3xl">Cette table n’existe pas…</h1>
        <p className="mx-auto mt-3 max-w-md text-cream/70">La page que vous cherchez a été déplacée ou n’existe plus.</p>
        <Link to="/" className="btn-gold mt-8">
          <ArrowLeft className="h-4 w-4" /> Retour à l’accueil
        </Link>
      </div>
    </section>
  );
}
