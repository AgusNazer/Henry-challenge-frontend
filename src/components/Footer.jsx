import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

const Footer = () => (
  <div className="py-8">
    <div className="container mx-auto text-center">
      <hr className="border-t-1 border-gray-400 mb-4" />
      <h4 className="text-l font-semibold mb-4 text-gray-600">Desarrollado por Agustin Nazer 👨🏽‍💻</h4>
      <div className="flex justify-center space-x-6">
        <a
          href="https://www.linkedin.com/in/agust%C3%ADnnazer/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
        >
          <AiFillLinkedin className="text-2xl" />
          <h2 className="text-base">LinkedIn</h2>
        </a>
        <a
          href="https://github.com/AgusNazer"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <AiFillGithub className="text-2xl" />
          <h2 className="text-base">Github</h2>
        </a>
        <a
          href="mailto:Agustin.nazer@hotmail.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
        >
          <AiOutlineMail className="text-2xl" />
          <h2 className="text-base">Email</h2>
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
