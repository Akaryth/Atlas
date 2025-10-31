import { UserTheme } from "@/types/usertheme";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function ThemeEditorModal({
    theme,
    isOpen,
    onClose,
    onSave,
}: {
    theme: UserTheme | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedTheme: UserTheme) => void;
}) {
    const [name, setName] = useState("");
	const [css, setCss] = useState("");

	useEffect(() => {
		if (theme) {
			setName(theme.name);
			setCss(theme.css);
		} else {
			setName("");
			setCss(`.my-theme {
  --background: oklch(0.15 0.01 30);
  --foreground: oklch(0.92 0.01 30);
  --primary: oklch(0.7 0.18 15);
  --primary-foreground: oklch(0.98 0.005 30);
  --secondary: oklch(0.35 0.05 10);
  --secondary-foreground: var(--foreground);
  --accent: oklch(0.6 0.1 60);
  --accent-foreground: var(--primary-foreground);
  --muted: oklch(0.25 0.01 30);
  --muted-foreground: oklch(0.65 0.01 30);
  --border: oklch(0.3 0.01 30);
  --input: var(--border);
  --card: oklch(0.2 0.015 30);
  --card-foreground: var(--foreground);
  --popover: var(--card);
  --popover-foreground: var(--foreground);
  --ring: var(--primary);
}`);
		}
	}, [theme]);

	if (!isOpen) return null;

	const handleSave = () => {
		if (!name.trim()) return;
		onSave({ ...theme!, name: name.trim(), css });
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
			<div className="bg-background border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
				<div className="p-4 sm:p-6">
					<h3 className="text-lg font-medium mb-4">
						{theme ? "Edit Theme" : "Create New Theme"}
					</h3>

					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium mb-1 block">Theme Name</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="My Custom Theme"
								className="w-full p-2 border rounded bg-background text-foreground text-sm"
							/>
						</div>

						<div>
							<label className="text-sm font-medium mb-1 block">CSS Variables</label>
							<textarea
								value={css}
								onChange={(e) => setCss(e.target.value)}
								placeholder={`.my-theme {\n  --primary: #6b46c1;\n  ...\n}`}
								className="w-full h-60 font-mono text-xs sm:text-sm p-2 border rounded bg-background text-foreground"
							/>
							<p className="text-xs text-muted-foreground mt-1">
								Start with <code>.your-theme-name {'{'}</code>
							</p>
						</div>
					</div>

					<div className="flex justify-end gap-2 mt-6">
						<Button variant="outline" onClick={onClose} className="text-sm px-3 py-1">
							Cancel
						</Button>
						<Button onClick={handleSave} className="text-sm px-3 py-1">
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}