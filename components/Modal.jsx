import { RxCross1 } from 'react-icons/rx'

function Modal({show, onClose, children}) {
  return (
    <div>
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-1000 z-10"
        style={{
          transform: show ? "translate(0%)" : "translate(+100%)",
        }}
      >
        <div className="container mx-auto max-w-2xl h-[80vh] overflow-y-auto rounded-3xl bg-slate-800 py-6 px-4">
          <button
            className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600 hover:bg-red-500"
            onClick={() => onClose(false)}
          >
            <p className="text-3xl font-thin ml-1.5 transition-all duration-900">
              <RxCross1 />
            </p>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
