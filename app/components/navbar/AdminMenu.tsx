'use client';

const AdminMenu = () => {
  return ( 
    <div
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-center
          sm:justify-between
        "
      >
        <div
          onClick={() => {}}
          className="
            text-sm
            text-white 
            font-semibold
            px-6
          "
        >
            Listar documentos
        </div>
        <div 
          onClick={() => {}}
          className="
            hidden 
            sm:block 
            text-sm
            text-white 
            font-semibold 
            px-6 
            border-l-[1px] 
            flex-1 
            text-center
          "
        >
            Enviar documentos
        </div>
      </div>
    </div>
  );
}
 
export default AdminMenu;