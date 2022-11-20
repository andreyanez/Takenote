import { Link, useNavigate } from 'react-router-dom';
import { useNote } from '../layouts/NoteLayout';
import ReactMarkdown from 'react-markdown';

type NoteProps = {
	onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
	const note = useNote();
	const navigate = useNavigate();

	return (
		<div className="align-items-center mb-4">
			<div className="flex justify-between mb-8 items-start">
				<div className="w-full md:w-1/2 pr-4">
					<h1 className="font-bold md:text-left text-2xl text-center sm:text-left sm:text-6xl mb-6 md:text-5xl ">
						{note.title}
					</h1>
					{note.tags.length > 0 && (
						<ul className="flex justify-center md:justify-start">
							{note.tags.map(tag => (
								<span
									key={tag.id}
									className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
								>
									{tag.label}
								</span>
							))}
						</ul>
					)}
				</div>
				<div className="hidden gap-2 justify-end w-1/2 sm:flex button__group">
					<Link to={`/${note.id}/edit`}>
						<button
							type="button"
							className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Editar
						</button>
					</Link>
					<button
						className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-red-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={() => {
							onDelete(note.id);
							navigate('/');
						}}
					>
						Eliminar
					</button>
					<Link to="/">
						<button
							type="button"
							className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Regresar
						</button>
					</Link>
				</div>
			</div>
			<ReactMarkdown>{note.markdown}</ReactMarkdown>
			<div className="flex gap-2 justify-evenly mt-8 sm:hidden">
				<Link to={`/${note.id}/edit`}>
					<button
						type="button"
						className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Editar
					</button>
				</Link>
				<button
					className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-red-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					onClick={() => {
						onDelete(note.id);
						navigate('/');
					}}
				>
					Eliminar
				</button>
				<Link to="/">
					<button
						type="button"
						className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Regresar
					</button>
				</Link>
			</div>
		</div>
	);
}
