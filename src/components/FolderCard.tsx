import { IconContext } from "react-icons";
import { FaRegFolderOpen } from "react-icons/fa";
// TODO: Replace the type declaration with that of the folder from the schema

function FolderCard() {
  return (
    <div className='w-[300px] bg-slate-200 m-5 rounded-xl rounded-tl-none text-black p-6 flex flex-col justify-between'>
      <p className='wrap-text mb-9'>
        RANDOM TITLE RANDOM TITLE RANDOM TITLE RANDOM TITLE RANDOM TITLE RANDOM
      </p>
      <div className='self-end '>
        <IconContext.Provider value={{ className: "shared-class", size: "30" }}>
          <FaRegFolderOpen />
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default FolderCard;
