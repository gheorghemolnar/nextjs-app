import { list, IResponseRO } from '@/lib/services';
import { CONTROL_DTO, CONTROL_RO, SITE_DTO } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;
export const dynamic = 'force-dynamic'

const handler = async (_request: NextRequest) => {
  const payload: CONTROL_DTO = {
    version: '1',
    table: 'CONTROLE',
    company: '',
    site: ''
  };

  const data = await list.get.controls(payload);

  return NextResponse.json({ data });
}

export { handler as GET}

// type User = {
//   name: string;
// };

// export const runtime = 'nodejs'

// const payload: CONTROL_DTO = {
//   version: '1',
//   table: 'CONTROLE',
//   company: '',
//   site: ''
// };

// const getAllUsers = async (): Promise<{
//   data: User[];
// }> => {
//   return new Promise(resolve => {
//     setTimeout(async () => {
//       resolve({
//         data: [{ name: 'Michael' }, { name: 'Sarah' }, { name: 'Bill' }]
//       });
//     }, 1000);
//   });
// };

// /* const getAllUsers_NOT_USED = async (): Promise< */
// /* users: User[]; */
// /*   IResponseRO<CONTROL_RO>
// > => { */
// /* return new Promise(async resolve => { */
// /* setTimeout(async () => { */
// /*  const data = await getControlsList(payload); */
// /* resolve(data); */
// /*       resolve({
//           users: [{ name: 'Michael' }, { name: 'Sarah' }, { name: 'Bill' }],
//           data
//         });
//       }, 5000); */
// /*   });
// }; */
// // const data = await getAllUsers();

// export async function GET(request: Request) {
//   // console.log('Route GET =>>>>>', request);

//   //const response = await getAllUsers();
//   const response = await getControlsList(payload);

//   console.log('🚀 >>>>>>>>>>>>>> GET ~ response:', response);
//   const data = response;
//   return NextResponse.json({ data });
// }
