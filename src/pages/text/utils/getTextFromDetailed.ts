import { DetailDescriptor } from '../../../api/process';
import { getColorFromValue } from './getEntriesFromText';

export const getTextFromDetailed = (detailed: DetailDescriptor[] = []) => {
  let html = '';

  detailed.forEach((item, index) => {
    const [_, metric] = item.features;
    const color = getColorFromValue(metric / 100);
    html += `<p class="detailedText" data-index="${index}" style="background-color: ${color};">${item.text}</p> `;
  });

  return html;
};
