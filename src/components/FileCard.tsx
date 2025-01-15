import { FileInfo, FolderInfo } from "@/app/types/global";
import { IconContext } from "react-icons";
import { FaRegFolderOpen } from "react-icons/fa";

function FileCard({
  file,
  onClick,
}: {
  file: FileInfo;
  onClick: (folder: FolderInfo) => void;
}) {
  return (
    <div
      className='w-[200px] h-[150px] bg-slate-200 m-5 rounded-tl-xl text-black p-6 flex flex-col justify-center items-center'
      onClick={() => onClick(file)}
    >
      <p className='wrap-text'>{file.title}</p>
    </div>
  );
}

export default FileCard;
