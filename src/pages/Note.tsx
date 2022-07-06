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
		<>
			<div className="align-items-center mb-4">
				<div>
					<h1>{note.title}</h1>
					{note.tags.length > 0 && (
						<div className="flex-wrap">
							{note.tags.map(tag => (
								<div className="text-truncate" key={tag.id}>
									{tag.label}
								</div>
							))}
						</div>
					)}
				</div>
				<div>
					<div>
						<Link to={`/${note.id}/edit`}>
							<button>Editar</button>
						</Link>
						<button
							onClick={() => {
								onDelete(note.id);
								navigate('/');
							}}
						>
							Eliminar
						</button>
						<Link to="/">
							<button>Regresar</button>
						</Link>
					</div>
				</div>
			</div>
			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	);
}
