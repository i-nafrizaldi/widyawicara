'use client';

import { useAppSelector } from '@/redux/hooks';
import { Role } from '@/types/user.type';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoggedIn(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    const { id, role } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (id && !isLoading) {
        if (role === Role.CUSTOMER) {
          redirect('/user');
        }
        if (role === Role.DRIVER) {
          redirect('/dashboard/driver');
        }
        if (role === Role.OUTLET_ADMIN) {
          redirect('/dashboard/master');
        }
        if (role === Role.SUPER_ADMIN) {
          redirect('/dashboard/master');
        }
        if (role === Role.WORKER) {
          redirect('/dashboard/worker');
        }
      }
    }, [id, isLoading]);

    // if (isLoading || !id) {
    //   return (
    //     <div className="flex flex-col px-6 h-screen place-content-center items-center gap-4">
    //       <div className="animate-pulse">
    //         <p>Loading</p>
    //       </div>
    //     </div>
    //   );
    // }

    return <Component {...props} />;
  };
}
