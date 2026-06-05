import { X } from "lucide-react";

export default function FilePreviewModal({
  file,
  onClose,
}) {
  if (!file) return null;

  const isImage =
    /\.(png|jpg|jpeg|gif|webp)$/i.test(
      file.fileName
    );

  const isPdf =
    /\.pdf$/i.test(file.fileName);

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >
      <div
        className="
          bg-slate-900
          border
          border-slate-700
          rounded-3xl
          w-full
          max-w-5xl
          h-[80vh]
          overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            p-5
            border-b
            border-slate-800
          "
        >
          <h2 className="text-white text-xl font-semibold">
            {file.fileName}
          </h2>

          <button
            onClick={onClose}
            className="text-white"
          >
            <X />
          </button>
        </div>

        {/* Content */}

        <div className="h-full bg-slate-950">
          {isImage && (
            <img
              src={file.fileUrl}
              alt={file.fileName}
              className="
                w-full
                h-full
                object-contain
              "
            />
          )}

          {isPdf && (
            <iframe
              src={file.fileUrl}
              title={file.fileName}
              className="
                w-full
                h-full
              "
            />
          )}

          {!isImage && !isPdf && (
            <div
              className="
                flex
                items-center
                justify-center
                h-full
                text-slate-400
              "
            >
              Preview not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}