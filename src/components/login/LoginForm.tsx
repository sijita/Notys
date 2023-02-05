import { Link } from "react-router-dom";
import useEntryForm from "../../hooks/useEntryForm";
import Input from "../Input";

export default function LoginForm() {
  const {
    auth,
    registerForm,
    setRegisterForm,
    callResponse,
    formData,
    setFormData,
  } = useEntryForm();

  const handleFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200">
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

        <div className="mt-5">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-200">
              Contraseña
            </label>
            {!registerForm && (
              <Link
                to="/"
                className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
              >
                Olvidé mi contraseña
              </Link>
            )}
          </div>

          <Input
            name="password"
            value={formData.password}
            type="password"
            placeholder="********"
            onChange={handleFormData}
            required
          />
        </div>

        <div className="mt-6">
          <button
            className={`w-full btn bg-blue-500 disabled:bg-blue-500 disabled:text-white ${
              !registerForm
                ? "hover:bg-transparent"
                : "hover:bg-transparent bg-green-500"
            }`}
            disabled={callResponse ? true : false}
          >
            {callResponse === "Cargando..."
              ? callResponse
              : !registerForm
              ? "Iniciar sesión"
              : "Registrarse"}
          </button>
        </div>
        {callResponse !== "Cargando..." && (
          <p className="my-3 text-red-500 text-center">{callResponse}</p>
        )}
      </form>

      {registerForm ? (
        <>
          <button
            className="text-blue-500 focus:outline-none focus:underline hover:underline mt-6 w-full"
            onClick={() => setRegisterForm(false)}
          >
            Iniciar sesión
          </button>
          <p className="my-3 text-red-500 text-center">{callResponse}</p>
        </>
      ) : (
        <p className="mt-6 text-sm text-center text-gray-400">
          No tienes cuenta?{" "}
          <button
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
            onClick={() => setRegisterForm(true)}
          >
            Registrate
          </button>
          .
        </p>
      )}
    </>
  );
}
