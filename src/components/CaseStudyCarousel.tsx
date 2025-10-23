import { useState } from 'react';
import type { CaseStudy } from '../data/caseStudies';

interface CaseStudyCarouselProps {
  items: CaseStudy[];
}

export function CaseStudyCarousel({ items }: CaseStudyCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!items.length) {
    return null;
  }

  const next = () => setCurrent((index) => (index === items.length - 1 ? 0 : index + 1));
  const previous = () => setCurrent((index) => (index === 0 ? items.length - 1 : index - 1));

  const study = items[current];

  return (
    <div className="relative">
      <div className="bg-gray-50 border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10 lg:p-12">
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-600">{study.eyebrow}</h3>
            <p className="text-slate-700">{study.body}</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">Before</h4>
                <ul className="mt-3 space-y-2 text-slate-700">
                  {study.before.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-red-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">After</h4>
                <ul className="mt-3 space-y-2 text-slate-700">
                  {study.after.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="text-lg font-semibold text-slate-900">{study.insightTitle}</h4>
              <p className="text-slate-700">{study.insightBody}</p>
              <ul className="space-y-3">
                {study.insightPoints.map((point) => (
                  <li key={point.title} className="text-slate-700 leading-relaxed">
                    <span className="block font-semibold text-slate-900">{point.title}</span>
                    <span className="block">{point.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
            <div className="flex justify-center gap-2 md:justify-start">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 w-8 rounded-full transition ${index === current ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`View case study ${index + 1}`}
                  aria-pressed={index === current}
                />
              ))}
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:w-auto md:justify-end">
              <button
                type="button"
                onClick={previous}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
              >
                <span aria-hidden="true">←</span>
                Previous
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
              >
                Next
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyCarousel;
