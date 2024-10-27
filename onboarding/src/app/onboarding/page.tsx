
import { metaObject } from '@/config/site.config';
import MultiStepFormOne from '../shared/multi-step/multi-step-1';

export const metadata = {
  ...metaObject('Multi Step'),
};

export default function MultiStepFormPage() {
  return <MultiStepFormOne />;
}
