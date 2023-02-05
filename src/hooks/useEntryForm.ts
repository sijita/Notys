import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/apiClient";
import { useRecoilState } from "recoil";
import { formDataState } from "../atoms/formDataState";
import useCallResponse from "./useCallResponse";
import { userDataState } from '../atoms/userDataState';

export default function useEntryForm() {
  const { callResponse, setCallResponse } = useCallResponse();
  const [registerForm, setRegisterForm] = useState<Boolean>(false);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [userData, setUserData] = useRecoilState(userDataState);

  let navigate = useNavigate();

  const auth = async () => {
    try {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/;
      const validation = regex.test(formData.password);

      if (registerForm) {
        if (!validation) {
          setCallResponse(
            "Tu contraseña debe tener al menos 1 mayuscula, 1 digito y 1 simbolo"
          );
          return;
        } else {
          await axiosClient.post("auth/v1/signup", formData).then((res) => {
            setRegisterForm(false);
            setCallResponse("Registro exitoso. Confirma tu email");
          });
        }
      } else {
        await axiosClient
          .post("auth/v1/token?grant_type=password", formData)
          .then((res) => {
            setUserData({
              userId: res.data.user.id,
              accessToken: res.data.access_token,
            });
            setCallResponse("Cargando...");
            navigate("/home", { replace: true });
          });
      }
    } catch (error: any) {
      setCallResponse(error.response.data.error_description);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return {
    auth,
    callResponse,
    registerForm,
    setRegisterForm,
    formData,
    setFormData,
  };
}
