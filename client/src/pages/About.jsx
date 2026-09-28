import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe2, HeartHandshake, Leaf } from 'lucide-react';
import { images, restaurant } from '@shared/content.js';
import PageHero from '../components/PageHero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import ReservationCTA from '../components/ReservationCTA.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const values = [
  {
    Icon: Globe2,
    title: 'Une cuisine métissée',
    text: 'Les classiques de la gastronomie française rencontrent l’Italie, l’Espagne, l’Amérique latine et le Japon.',
  },
  {
    Icon: Leaf,
    title: 'Des produits choisis',
    text: 'Viandes, poissons et légumes sélectionnés avec soin, travaillés chaque jour dans notre cuisine.',
  },
  {
    Icon: HeartHandshake,
    title: 'Un accueil attentionné',
    text: 'Un service à table discret et de bon conseil, pour que chaque visite soit un moment privilégié.',
  },
  {
    Icon: Award,
    title: 'Une adresse reconnue',
    text: `Noté ${restaurant.ratings.tripadvisor.score.toString().replace('.', ',')}/5 sur Tripadvisor et classé ${restaurant.ratings.tripadvisor.rank}.`,
  },
];

export default function About() {
  useDocumentTitle('Notre Restaurant');
  return (
    <>
      <PageHero
        eyebrow="Notre restaurant"
        title="Une table d’exception à Bonapriso"
        subtitle="Un lieu où l’élégance française rencontre la chaleur latine, au cœur du quartier le plus prisé de Douala."
        image={images.interiorWarm}
        crumb="Notre Restaurant"
      />

      {/* Story */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Notre histoire" title="Une façade discrète, un monde de saveurs">
              <p>
                Rue Batibois, à Bonapriso, rien ou presque ne laisse deviner ce qui se cache derrière la porte du Bistro Latin. Une fois à
                l’intérieur, une grande salle au décor soigné s’ouvre sur une cour intérieure arborée — un écrin de verdure au cœur de la ville.
              </p>
              <p className="mt-4">
                Notre carte est un voyage : foie gras maison sur pain d’épices, pâtes <em>al dente</em> et rougets saisis à la perfection,
                paella, tapas, touches japonaises… sans oublier notre vitrine de pâtisseries pour finir le repas en douceur.
              </p>
              <p className="mt-4">
                Maison fièrement dirigée par une femme, le Bistro Latin cultive l’art de recevoir : service attentif, cadre cocooning et
                ambiance lounge dès la tombée de la nuit.
              </p>
            </SectionHeading>
            <Reveal className="mt-9 flex flex-wrap gap-4">
              <Link to="/menu" className="btn-dark">
                Découvrir la carte <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/reservation" className="btn border border-ink/20 text-ink hover:border-gold hover:text-gold-dark">
                Réserver
              </Link>
            </Reveal>
          </div>

          <Reveal className="relative grid grid-cols-5 grid-rows-6 gap-4 sm:h-[560px]">
            <img
              src={images.greenhouse}
              alt="Cour intérieure verdoyante"
              loading="lazy"
              className="col-span-3 row-span-4 h-full min-h-[260px] w-full rounded-sm object-cover"
            />
            <img src={images.chef} alt="Le chef dresse une assiette" loading="lazy" className="col-span-2 row-span-3 h-full w-full rounded-sm object-cover" />
            <img src={images.heroPlate} alt="Assiette gastronomique" loading="lazy" className="col-span-2 row-span-3 h-full w-full rounded-sm object-cover" />
            <div className="col-span-3 row-span-2 flex flex-col justify-center rounded-sm bg-ink p-6 text-cream">
              <p className="font-script text-3xl text-gold italic">L’art de recevoir, à la française et à la latine</p>
              <p className="mt-2 text-xs tracking-[0.2em] text-cream/60 uppercase">Bonapriso · Douala</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink py-20 text-cream sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Notre philosophie" title="Ce qui nous rend uniques" align="center" dark />
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90} className="bg-ink-2 p-8 transition hover:bg-ink-3">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen & lounge */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {[
            {
              img: images.kitchen,
              eyebrow: 'En cuisine',
              title: 'Le savoir-faire du chef',
              text: 'Cuissons précises, sauces maison et assiettes généreuses : notre brigade travaille chaque jour des produits frais pour le déjeuner comme pour le dîner.',
              to: '/menu',
              cta: 'Voir le menu',
            },
            {
              img: images.lounge,
              eyebrow: 'Le soir',
              title: 'L’esprit lounge',
              text: 'À la nuit tombée, lumières tamisées, cocktails signature et belle carte de vins transforment le Bistro en lounge chic.',
              to: '/evenements',
              cta: 'Nos événements',
            },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 120} className="group relative isolate flex min-h-[460px] items-end overflow-hidden rounded-sm p-8 text-cream">
              <img src={b.img} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <div>
                <p className="eyebrow text-gold">{b.eyebrow}</p>
                <h3 className="mt-2 font-serif text-3xl font-semibold">{b.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">{b.text}</p>
                <Link to={b.to} className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-gold uppercase hover:text-gold-light">
                  {b.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ReservationCTA />
    </>
  );
}
