import { Link } from 'react-router-dom';
import { Tag } from '../App';

type SimplifiedNote = {
	tags: Tag[];
	title: string;
	id: string;
};

export function NoteCard({ id, title, tags }: SimplifiedNote) {
	return (
		<Link to={`/${id}`} className="h-100 text-reset text-decoration-none">
			<li key={id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
				<div className="w-full flex items-center justify-between p-6">
					<div className="flex flex-col items-center gap-y-3 justify-center w-full">
						<h3 className="text-gray-900 text-2xl font-medium truncate">{title}</h3>
						{tags.length > 0 && (
							<div className="flex gap-2">
								{tags.map(tag => (
									<span
										key={tag.id}
										className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
									>
										{tag.label}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</li>
		</Link>
	);
}
