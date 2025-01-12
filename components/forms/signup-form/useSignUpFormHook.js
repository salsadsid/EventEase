import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "./schema";
import { initialSignUpFormValues } from "./utils";
const useSignUpFormHook = () => {
  const renderSignUpForm = useForm({
    defaultValues: initialSignUpFormValues,
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return {
    renderSignUpForm,
  };
};

export default useSignUpFormHook;
