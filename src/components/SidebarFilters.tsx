"use client";

import React, { useEffect, useState } from "react";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Link from "next/link";
import Radio from "@/shared/Radio/Radio";
import MySwitch from "@/components/MySwitch";
import { Disclosure } from "@/app/headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { FC } from "react";
import { useRouter } from "next/navigation";

// DEMO DATA
const DATA_categories = [
  {
    name: "Backpacks",
  },
  {
    name: "Travel Bags",
  },
  {
    name: "Laptop Sleeves",
  },
  {
    name: "Organization",
  },
  {
    name: "Accessories",
  },
];

const DATA_colors = [
  { name: "White" },
  { name: "Beige" },
  { name: "Blue" },
  { name: "Black" },
  { name: "Brown" },
  { name: "Green" },
  { name: "Navy" },
];

const DATA_sizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "2XL" },
];

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "Most-Popular" },
  { name: "Best Rating", id: "Best-Rating" },
  { name: "Newest", id: "Newest" },
  { name: "Price Low - Hight", id: "Price-low-hight" },
  { name: "Price Hight - Low", id: "Price-hight-low" },
];

const PRICE_RANGE = [1, 10000];
//
const SidebarFilters = (
  { categories }: [{ _id: string; name: string }] | any,
  params: [string]
) => {
  //
  const [isOnSale, setIsIsOnSale] = useState(true);
  const [rangePrices, setRangePrices] = useState([100, 10000]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [colorsState, setColorsState] = useState<string[]>([]);
  const [sizesState, setSizesState] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");
  const [renderWithOffer, setRenderWithOffer] = useState(false);
  const { id } = useParams();

  //
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };

  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setColorsState([...colorsState, name])
      : setColorsState(colorsState.filter((i) => i !== name));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
    checked
      ? setSizesState([...sizesState, name])
      : setSizesState(sizesState.filter((i) => i !== name));
  };

  //

  // OK
  const renderTabsCategories = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Categories</h3>
        {DATA_categories.map((item) => (
          <div key={item.name} className="">
            <Checkbox
              name={item.name}
              label={item.name}
              defaultChecked={categoriesState.includes(item.name)}
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              onChange={(checked) => handleChangeCategories(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  // OK
  // const renderTabsColor = () => {
  //   return (
  //     <div className="relative flex flex-col py-8 space-y-4">
  //       <h3 className="font-semibold mb-2.5">Colors</h3>
  //       {DATA_colors.map((item) => (
  //         <div key={item.name} className="">
  //           <Checkbox
  //             sizeClassName="w-5 h-5"
  //             labelClassName="text-sm font-normal"
  //             name={item.name}
  //             label={item.name}
  //             defaultChecked={colorsState.includes(item.name)}
  //             onChange={(checked) => handleChangeColors(checked, item.name)}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // // OK
  // const renderTabsSize = () => {
  //   return (
  //     <div className="relative flex flex-col py-8 space-y-4">
  //       <h3 className="font-semibold mb-2.5">Sizes</h3>
  //       {DATA_sizes.map((item) => (
  //         <div key={item.name} className="">
  //           <Checkbox
  //             name={item.name}
  //             label={item.name}
  //             defaultChecked={sizesState.includes(item.name)}
  //             onChange={(checked) => handleChangeSizes(checked, item.name)}
  //             sizeClassName="w-5 h-5"
  //             labelClassName="text-sm font-normal"
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // OK
  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-5 pr-3">
        <div className="space-y-5" style={{ direction: "rtl" }}>
          <span className="font-semibold">السعر</span>
          <Slider
            range
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={1}
            reverse={true}
            defaultValue={[rangePrices[0], rangePrices[1]]}
            allowCross={false}
            onChange={(_input: number | number[]) =>
              setRangePrices(_input as number[])
            }
          />
        </div>

        <div
          className="flex justify-between space-x-5"
          style={{ direction: "rtl" }}
        >
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              style={{ textAlign: "center" }}
            >
              السعر من
            </label>
            <div className="mt-1 relative rounded-md" style={{position:"relative"}}>
              <input
                type="text"
                name="minPrice"
                disabled
                id="minPrice"
                className="block w-32 pr-6 pl-2 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrices[0]}
              />
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm" style={{left: "12px", display: "flex", justifyContent:"flex-end"}}>
                ر.س
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              style={{ textAlign: "center" }}
            >
              السعر الي
            </label>
            <div className="mt-1 relative rounded-md">
           
              <input
                type="text"
                disabled
                name="maxPrice"
                id="maxPrice"
                className="block w-32 pr-6 pl-2 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrices[1]}
              />
                 <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm" style={{left: "7px", display: "flex", justifyContent:"flex-end"}}>
                ر.س
              </span>
            </div>
          </div>
        </div>
        <div style={{ direction: "rtl" }}>
          <input
            type="checkbox"
            checked={renderWithOffer}
            style={{ marginInlineEnd: "10px" }}
            onChange={(e) => setRenderWithOffer(!renderWithOffer)}
          />
          <label htmlFor="">عرض التخفيضات فقط</label>
        </div>
        <div className="filter-btn block lg:w-1/3 xl:w-1/4 pr-4">
          <ButtonPrimary
            href={
              id.length > 1
                ? `/category/${id[0]}/${id[1]}?from=${rangePrices[0]}&to=${rangePrices[1]}&offer=${renderWithOffer}`
                : `/category/${id[0]}?from=${rangePrices[0]}&to=${rangePrices[1]}&offer=${renderWithOffer}`
            }
          >
            تصفيه
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  // OK
  const renderTabsSortOrder = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Sort order</h3>
        {DATA_sortOrderRadios.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioNameSort"
            label={item.name}
            defaultChecked={sortOrderStates === item.id}
            sizeClassName="w-5 h-5"
            onChange={setSortOrderStates}
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  const renderTabsLinks = () => {
    // const [currentCtg, setCurrentCtg] = useState<String>("");

    // const id = searchParams.getAll('_id');

    const isOpen = (item) => {
      if (item._id === id[0]) {
        return true;
      }
      if (id[1] === id[0]) {
        for (let i = 0; i < item.subCategories.length; i++) {
          if (item.subCategories[i]?._id === id[1]) {
            return true;
          }
        }
      }
    };
    return (
      <div
        style={{ direction: "rtl" }}
        className="relative flex flex-col py-8 space-y-4"
      >
        <h3 className="font-semibold mb-2.5">الفئه</h3>
        {categories.map(
          (
            item: { _id: string; name: string; subCategories: any },
            index: number
          ) => {
            return (
              <Disclosure key={index} defaultOpen={isOpen(item)}>
                {({ open }) => {
                  // setCurrentCtg(item.id);
                  return (
                    <>
                      <Disclosure.Button
                        // onClick={() =>
                        //   !open && router.push(`/category/${item._id}`)
                        // }
                        className="flex items-center flex-start w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 "
                      >
                        {!open ? (
                          <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        ) : (
                          <MinusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        )}
                        <span style={{ margin: "0 10px" }}>{item.name}</span>
                      </Disclosure.Button>
                      <Disclosure.Panel
                        // className={panelClassName}
                        as="div"
                        // dangerouslySetInnerHTML={{ __html: `<div>helo</div>` }}
                      >
                        <div>
                          {item.subCategories?.length > 0
                            ? item.subCategories.map(
                                (subCtg: { _id: string; name: string }) => {
                                  return (
                                    <Link
                                      style={{
                                        display: "block",
                                        padding: "5px 20px",
                                        color:
                                          id[1] === subCtg?._id && "#21A5E9",
                                        fontWeight:
                                          id[1] === subCtg?._id && "500",
                                      }}
                                      key={subCtg._id}
                                      href={`/category/${item?._id}/${subCtg?._id}`}
                                    >
                                      {subCtg.name}
                                    </Link>
                                  );
                                }
                              )
                            : null}
                        </div>
                      </Disclosure.Panel>
                    </>
                  );
                }}
              </Disclosure>
            );
          }
        )}
        {/* {DATA_sortOrderRadios.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioNameSort"
            label={item.name}
            defaultChecked={sortOrderStates === item.id}
            sizeClassName="w-5 h-5"
            onChange={setSortOrderStates}
            className="!text-sm"
          />
        ))} */}
      </div>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {/* {renderTabsCategories()} */}
      {/* {renderTabsColor()} */}
      {/* {renderTabsSize()} */}
      {renderTabsPriceRage()}
      {renderTabsLinks()}
      {/* <div className="py-8 pr-2">
        <MySwitch
          label="On sale!"
          desc="Products currently on sale"
          enabled={isOnSale}
          onChange={setIsIsOnSale}
        />
      </div> */}
      {/* {renderTabsSortOrder()} */}
    </div>
  );
};

export default SidebarFilters;
