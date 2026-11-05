import i18n from '../i18n';
import curriculumUrlPt from '../../docs/curriculo/Curriculo_Guilherme_Zalla_PT-BR.pdf';
import curriculumUrlEn from '../../docs/curriculo/Guilherme_Zalla_Resume_EN-US.pdf';
import portraitUrl from '../assets/images/portrait.webp';

// Fill only confirmed links here. Missing contacts render as non-clickable placeholders.
export const profile = {
  name: 'Guilherme Zalla',
  role: 'Software Engineer',
  github: 'https://github.com/GuilhermeZalla',
  email: 'zallaguilherme@gmail.com',
  linkedin: 'https://www.linkedin.com/in/guilhermezalla/',
  whatsapp: 'https://wa.me/5511999423099',
  portraitUrl,
  stack: ['React', 'React Native', 'Node.js', 'Laravel', 'C# / .NET'],
  curriculumUrls: {
    en: curriculumUrlEn,
    pt: curriculumUrlPt,
  },
  get curriculumUrl() {
    const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
    return this.curriculumUrls[language] || this.curriculumUrls.en;
  },
};