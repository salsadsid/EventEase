import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createEventFormSchema } from "./schema";
import { initialCreateEventFormValues } from "./utils";
const useCreateEventFormHook = () => {
  // console.log("session: ", session.user?.email);
  const renderCreateEventForm = useForm({
    defaultValues: initialCreateEventFormValues,
    resolver: zodResolver(createEventFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return {
    renderCreateEventForm,
  };
};

export default useCreateEventFormHook;
