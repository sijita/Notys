import useEntryForm from "../../hooks/useEntryForm";
import Input from "../Input";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function LoginForm() {
  const {
    auth,
    registerForm,
    setRegisterForm,
    formData,
    setFormData,
    showPassword,
    setShowPassword,
  } = useEntryForm();

  const handleFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await auth();
  };

  return (
    <div className="flex flex-col gap-6">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-gray-200">
            Correo electrónico
          </label>
          <Input
            name="email"
            value={formData.email}
            type="email"
            placeholder="you@example.com"
            onChange={handleFormData}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-gray-200">
            Contraseña
          </label>
          <div className="relative">
            <Input
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              placeholder="********"
              onChange={handleFormData}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 bottom-0 flex items-center px-3"
            >
              {showPassword ? (
                <HiOutlineEye className="text-gray-500" />
              ) : (
                <HiOutlineEyeOff className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-2">
          <button
            className={`w-full btn bg-blue-500 disabled:bg-blue-500 disabled:text-white ${
              !registerForm
                ? "hover:bg-transparent"
                : "hover:bg-transparent bg-green-500"
            }`}
          >
            {!registerForm ? "Iniciar sesión" : "Registrarse"}
          </button>
        </div>
      </form>
      {registerForm ? (
        <>
          <button
            className="text-blue-500 focus:outline-none focus:underline hover:underline mt-6 w-full"
            onClick={() => setRegisterForm(false)}
          >
            Iniciar sesión
          </button>
        </>
      ) : (
        <div className="text-base text-center text-gray-400 flex gap-2 w-full justify-center">
          No tienes cuenta?
          <button
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
            onClick={() => setRegisterForm(true)}
          >
            Registrate.
          </button>
        </div>
      )}
    </div>
  );
}
