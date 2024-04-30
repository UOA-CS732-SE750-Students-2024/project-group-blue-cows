"use client";
import { MembersTable } from '@/components/ui/members-table'
import { studentData } from '@/gateway/getAllMembersForClub';
import { getAllMembers } from '@/services/clubServices';
import React, { useEffect, useState } from 'react'
import {membersColumns} from "../../components/ui/columns";


const page = () => {
  const [membersData, setMembersData] = useState<studentData[]>([]);
  useEffect(() => {
    const getData = async() => {
      const data = await getAllMembers(1);
      setMembersData(data);
    }
    getData();
  },[])

  return (
    <div className="flex h-screen">
      <div>
        <div className="flex justify-center items-center w-screen pl-40 pr-40 mt-10">
        <MembersTable columns={membersColumns} data={membersData} />
        </div>
      </div>
    </div>
  )
}


export default page