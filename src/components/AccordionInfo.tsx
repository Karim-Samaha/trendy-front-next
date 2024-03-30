"use client";

import { Disclosure } from "@/app/headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

const DEMO_DATA = [
  {
    name: "عن المنتج:",
    content:
      "Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.",
  },
  // {
  //   name: "Fabric + Care",
  //   content: `<ul class="list-disc list-inside leading-7">
  //   <li>Made from a sheer Belgian power micromesh.</li>
  //   <li>
  //   74% Polyamide (Nylon) 26% Elastane (Spandex)
  //   </li>
  //   <li>
  //   Adjustable hook & eye closure and straps
  //   </li>
  //   <li>
  //   Hand wash in cold water, dry flat
  //   </li>
  // </ul>`,
  // },

  // {
  //   name: "How it Fits",
  //   content:
  //     "Use this as a guide. Preference is a huge factor — if you're near the top of a size range and/or prefer more coverage, you may want to size up.",
  // },
  {
    name: "خصائص المنتج:",
    content: `
    <ul class="list-disc list-inside leading-7">
    <li>العلامة التجارية:الزهرة العصرية</li>
    <li>    اللون:أخضر - أبيض - موف
    </li>
    <li>
    الأبعاد:50×90
    </li>
    <li>
    الخامة:فازه سيراميك - زهور طبيعية
    </li>
  </ul>
    `,
  },
];

interface Props {
  panelClassName?: string;
  data?: typeof DEMO_DATA;
  allOpen: boolean;
  desc: string;
}

const AccordionInfo: FC<Props> = ({
  panelClassName = "p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6",
  data = DEMO_DATA,
  allOpen,
  desc,
}) => {
  let productData = data;
  productData[0] = {
    name: "عن المنتج:",
    content: desc,
  };
  return (
    <div className="w-full rounded-2xl space-y-2.5">
      {/* ============ */}
      {data.map((item, index) => {
        return (
          <Disclosure key={index} defaultOpen={allOpen}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                  <span>{item.name}</span>
                  {!open ? (
                    <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`${panelClassName} info`}
                  as="div"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}

      {/* ============ */}
    </div>
  );
};

export default AccordionInfo;
