import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./schema";
import { initialLoginFormValues } from "./utils";
const useLoginFormHook = () => {
  const renderLoginForm = useForm({
    defaultValues: initialLoginFormValues,
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return {
    renderLoginForm,
  };
};

export default useLoginFormHook;
