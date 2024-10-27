import { Link } from 'react-scroll';
import cn from '@/utils/class-names';
import SimpleBar from '@/component/ui/simplebar';

export const formParts = {
  summary: 'summary',
  media: 'media',
  pricing: 'pricing',
  dimensions: 'dimensions',
  colorsize: 'colorsize',
  others: 'others',
  tags: 'tags',
};

export const menuItems = [
  {
    label: 'Summary',
    value: formParts.summary,
  },
  {
    label: 'Images & Gallery',
    value: formParts.media,
  },
  {
    label: 'Pricing',
    value: formParts.pricing,
  },
  {
    label: 'Dimensions',
    value: formParts.dimensions,
  },
  {
    label: 'Color & Sizes',
    value: formParts.colorsize,
  },
  {
    label: 'Others',
    value: formParts.others,
  },
  {
    label: 'Tags',
    value: formParts.tags,
  },
];

interface FormNavProps {
  className?: string;
}

export default function FormNav({ className }: FormNavProps) {
  return (
    <div
      className={cn(
        'sticky top-[50px] z-20 border-b border-gray-300 bg-white py-0 font-medium text-gray-500 @2xl:top-[62px] 2xl:top-20 dark:bg-gray-50 mt-[-15px]',
        className
      )}
    >
      <SimpleBar>
        <div className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
          {menuItems.map((tab, idx) => (
            <Link
              key={tab.value}
              to={tab.value}
              spy={true}
              hashSpy={true}
              smooth={true}
              offset={idx === 0 ? -250 : -150}
              duration={500}
              className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000"
              activeClass="active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000"
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}