"use client";
import { MembersTable } from '@/components/ui/members-table'
import { studentData } from '@/gateway/getAllMembersForClub';
import { getAllMembers } from '@/services/clubServices';
import React, { useEffect, useState } from 'react'
import {membersColumns} from "../../components/ui/columns";
import LoadingSpinner from '@/components/ui/loading-spinner';

const page = () => {
  const [membersData, setMembersData] = useState<studentData[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async() => {
      const data = await getAllMembers(1);
      setMembersData(data);
      setLoading(false)
    }
    getData();
  },[])

  return (
    <div className="flex h-screen">
      <div>
        {loading ? <LoadingSpinner /> : <div className="flex justify-center items-center w-screen pl-40 pr-40 mt-10">
        <MembersTable columns={membersColumns} data={membersData} />
        </div>}
      </div>
    </div>
  )
}


export default page