import React from 'react';
import Typed from 'typed.js';

import Twemoji from '@/components/ui/Twemoji';

const TypedBios = () => {
  const el = React.useRef(null);
  const typed = React.useRef<Typed | null>(null);

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    });

    return () => typed.current?.destroy();
  }, []);

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
              I'm aliased as <b className="font-medium">N S Rawat</b> at work.        </li>
        <li>
              I live in <b className="font-medium">Delhi NCR, India</b>.        </li>
        <li>
        I specialize in <b className="font-medium">Predictive Modeling & Data Visualization</b>.        </li>
        <li>
        I work with <b className="font-medium">Pandas, NumPy, Scikit-learn & TensorFlow</b>.        </li>
      <li>I love transforming raw data into actionable insights.</li>        <li>
        I'm focusing on building <b className="font-medium">ML models & Data Pipelines</b>.        </li>
        <li>
        I create <b className="font-medium">interactive dashboards with Tableau & Power BI</b>.        </li>
        <li>
          I'm a dog-person <Twemoji emoji="dog" />.
        </li>
        <li>
          I'm a sporty-guy. I love
          <span className="ml-1">
            <Twemoji emoji="tennis" />, <Twemoji emoji="soccer-ball" />
          </span>
          .
        </li>
        <li>
        I enjoy <b className="font-medium">exploratory data analysis</b> and finding patterns.        </li>
        <li>
              I love playing <b className="font-medium">cricket</b> & <b className="font-medium">traveling</b> <Twemoji emoji="cricket-game" /> <Twemoji emoji="airplane" />.        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;
