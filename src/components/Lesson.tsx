/* eslint-disable import/no-duplicates */
import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

type Params = {
  slug: string;
};

export function Lesson({
  title,
  slug,
  availableAt,
  type,
}: LessonProps): JSX.Element {
  const { slug: routeSlug } = useParams<Params>();

  const isAvailable = useMemo(() => {
    return isPast(availableAt);
  }, [availableAt]);

  const dateFormatted = useMemo(() => {
    return format(availableAt, "EEEE' • 'd' de 'MMMM ' • 'k'h'mm", {
      locale: ptBR,
    });
  }, [availableAt]);

  const isActiveLesson = useMemo(() => {
    return routeSlug === slug;
  }, [routeSlug, slug]);

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{dateFormatted}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors ${
          isActiveLesson ? 'bg-green-500' : ''
        }`}
      >
        <header className="flex items-center justify-between">
          {isAvailable ? (
            <span
              className={`text-sm font-medium flex items-center gap-2 ${
                isActiveLesson ? 'text-white' : 'text-blue-500'
              }`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={`text-xs rounded px-2 py-[0.125rem] text-white border font-bold ${
              isActiveLesson ? 'border-white' : 'border-green-300'
            }`}
          >
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong
          className={`mt-5 block ${
            isActiveLesson ? 'text-white' : 'text-grey-200'
          }`}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
