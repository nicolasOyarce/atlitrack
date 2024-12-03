import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-950 text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">AtliTrack</h3>
                        <p className="text-gray-400">
                            Transforma tu vida a través del deporte y el ejercicio.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/classes" className="text-gray-400 hover:text-white transition-colors">
                                    Clases
                                </Link>
                            </li>
                            <li>
                                <Link href="/schedule" className="text-gray-400 hover:text-white transition-colors">
                                    Horarios
                                </Link>
                            </li>
                            <li>
                                <Link href="/plans" className="text-gray-400 hover:text-white transition-colors">
                                    Planes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-400">
                                <Phone size={18} className="mr-2" />
                                <span>+56 973664456</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Mail size={18} className="mr-2" />
                                <span>atlitrack@sportcenter.com</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <MapPin size={18} className="mr-2" />
                                <span>Principales #443, Santiago de Chile</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={24} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={24} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} AtliTrack. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Política de Privacidad
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Términos y Condiciones
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}