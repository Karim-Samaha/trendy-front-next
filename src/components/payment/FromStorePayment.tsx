import Input from "@/shared/Input/Input";
import Label from "../Label/Label";
import { FC, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
interface Props {
  storeDeleviryData: any;
  handleChange: any;
  formValue: any;
  setFormValue: any;
}
const DeleveryForm: FC<Props> = ({ setFormValue, formValue, handleChange }) => {
  const [value, onChange] = useState<string>("");
  const [showClender, setShowClender] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({
    deliveryDate: false,
    address: false,
    phone: false,
  });
  const handleDateSelect = (e: Date) => {
    let timeToConverte: Date;
    const offset: number = e.getTimezoneOffset();
    timeToConverte = new Date(e.getTime() - offset * 60 * 1000);
    onChange(timeToConverte.toISOString().split("T")[0]);
    setFormValue((prev: any) => ({
      ...prev,
      deliveryDate: timeToConverte.toISOString().split("T")[0],
    }));
    setErrors((prev: any) => ({ ...prev, deliveryDate: false }));
    setShowClender(false);
  };
  const validate = () => {
    let deliveryDate: boolean = true;
    let phone: boolean = true;
    let name: boolean = true;
    if (formValue.deliveryDate.length <= 0) {
      setErrors((prev: any) => ({ ...prev, deliveryDate: true }));
      deliveryDate = false;
    }
    if (formValue.name.length <= 0) {
      setErrors((prev: any) => ({ ...prev, name: true }));
      name = false;
    }
    if (formValue.phone.length <= 0) {
      setErrors((prev: any) => ({ ...prev, phone: true }));
      phone = false;
    }
    if (deliveryDate && name && phone) {
      setFormValue((prev: any) => ({ ...prev, valid: true }));
    }
  };

  return (
    <div
      className={`border border-slate-200 dark:border-slate-700 rounded-xl block`}
      style={{ width: "100%", direction: "rtl", padding: "10px" }}
    >
      <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
        <div className="flex-1 form-payment-label">
          <Label className="text-sm ">الاسم</Label>
          <Input
            className="mt-1.5"
            placeholder=""
            name="name"
            value={formValue.name}
            disabled={formValue.valid}
            onChange={(e) => {
              handleChange(e);
              setErrors((prev: any) => ({ ...prev, name: false }));
            }}
            defaultValue={""}
            type={"text"}
            style={{ border: errors.name && "1px solid red" }}
          />
          {errors.name && <span style={{ color: "red" }}>يجب ادخال الاسم</span>}
        </div>
      </div>
      <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
        <div className="flex-1 form-payment-label">
          <Label className="text-sm">رقم الهاتف</Label>
          <Input
            className="mt-1.5"
            placeholder=""
            name="phone"
            value={formValue.phone}
            disabled={formValue.valid}
            onChange={(e) => {
              handleChange(e);
              setErrors((prev: any) => ({ ...prev, phone: false }));
            }}
            defaultValue={""}
            type={"text"}
            style={{ border: errors.phone && "1px solid red" }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.phone && (
            <span style={{ color: "red" }}>يجب ادخال رقم الهاتف</span>
          )}
        </div>
      </div>
      <div className="flex-1 form-payment-label">
        <Label className="text-sm">
          تاريخ التوصيل (متاح من 2 الظهر الي 11م)
        </Label>
        <Input
          className="mt-1.5"
          placeholder=""
          defaultValue={""}
          type={"text"}
          value={value}
          disabled={formValue.valid}
          onFocus={() => setShowClender(true)}
          style={{ border: errors.deliveryDate && "1px solid red" }}
        />
        {errors.deliveryDate && (
          <span style={{ color: "red" }}>يجب تحديد تاريخ التوصيل</span>
        )}

        {showClender && (
          <Calendar
            locale="ar"
            minDate={new Date()}
            onChange={(e: any) => handleDateSelect(e)}
            value={value}
          />
        )}
      </div>
      <div
        className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3"
        style={{ margin: "20px 10px" }}
      >
        {!formValue.valid && (
          <ButtonSecondary className="flex-2 flex-shrink-0 " onClick={validate}>
            تاكيد البيانات
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
};

export default DeleveryForm;
