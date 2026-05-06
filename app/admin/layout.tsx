import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 min-h-screen">
        {children}
      </main>
    </div>
  );
}

// import Sidebar from '@/components/admin/Sidebar';

// export default function AdminLayout({ 
//   children 
// }: { 
//   children: React.ReactNode 
// }) {
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar />
//       <main className="flex-1 md:ml-64 p-6 min-h-screen">
//         {children}
//       </main>
//     </div>
//   );
// }
