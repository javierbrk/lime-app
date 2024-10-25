import { ComponentChild } from "preact";
import { FieldValues, Path } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

const InputField = <TFieldValues extends FieldValues>({
    id,
    label,
    register,
    options,
    error,
}: {
    id: Path<TFieldValues>;
    label: string | ComponentChild;
    register?: UseFormRegister<TFieldValues>;
    options?: RegisterOptions;
    error?: string | ComponentChild;
}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                data-testid="password-input"
                {...register(id, { ...options })}
                className="w-100"
            />
            {error && <p class="text-red-500 text-md mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
