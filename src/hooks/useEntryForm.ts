import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/apiClient";
import { useRecoilState } from "recoil";
import { formDataState } from "../atoms/formDataState";
import { userDataState } from "../atoms/userDataState";
import { toast } from "react-hot-toast";

export default function useEntryForm() {
  const [registerForm, setRegisterForm] = useState<Boolean>(false);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [userData, setUserData] = useRecoilState(userDataState);

  let navigate = useNavigate();

  const auth = async () => {
    let loadingToastId;
    try {
      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      const validation = regex.test(formData.password);

      if (registerForm) {
        if (!validation) {
          return toast.error(
            "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
          );
        } else {
          loadingToastId = toast.loading("Cargando...");
          await axiosClient.post("auth/v1/signup", formData);

          setRegisterForm(false);

          setFormData({
            email: "",
            password: "",
          });

          toast.dismiss(loadingToastId);

          return toast.success(
            "Por favor verifica tu correo electrónico para validar tu cuenta"
          );
        }
      } else {
        loadingToastId = toast.loading("Cargando...");
        const res = await axiosClient.post(
          "auth/v1/token?grant_type=password",
          formData
        );

        setFormData({
          email: "",
          password: "",
        });

        setUserData({
          userId: res.data.user.id,
          accessToken: res.data.access_token,
        });

        toast.dismiss(loadingToastId);

        toast.success("Bienvenido/a a Notys!");

        return navigate("/home", { replace: true });
      }
    } catch (error: any) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error_description);
    }
  };

  return {
    auth,
    registerForm,
    setRegisterForm,
    formData,
    setFormData,
  };
}
