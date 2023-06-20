// import React from 'react';

// import { formatDate } from '@/lib/utils';
// import { CONTROL } from '@/types/schema';
// import * as Dialog from '@radix-ui/react-dialog';

// import { ControlDetails } from '../ui/rti/controlDetails';

// type Properties = {
//     data: CONTROL;
//     onOpenDialog: (open: boolean) => void;
// };

// export default function ModalControl({ data }: Properties) {
//     return (
//         <>
//             <Dialog.Title className="DialogTitle">
//                 Détails contrôle du{' '}
//                 <span className="font-bold">{formatDate(data.DaHeCont)}</span>
//             </Dialog.Title>
//             <Dialog.Description className="DialogDescription">
//                 <span className="font-bold">Secteur</span>: {data.LibSecteur} /{' '}
//                 <span className="font-bold">Atélier</span>: {data.LibAtelier} /{' '}
//                 <span className="font-bold">Contrôle</span>: {data.LibCtrl}
//                 <br />
//                 <span className="font-bold">Descriptif contrôle</span> :{' '}
//                 {data.DescCtrl}
//             </Dialog.Description>

//             <div className="flex flex-column items-center">
//                 {data && <ControlDetails control={data} />}
//             </div>

//             {/*
//       <Button type="button" onClick={() => onOpenDialog(false)}>
//         Fermer
//       </Button>
//       */}
//         </>
//     );
// }


export default function ShouldDeleteMe() {
    return <div>EMPTY</div>
}