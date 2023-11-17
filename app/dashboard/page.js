"use client"
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/Usercontext';
import { fetchUsers } from '../../hooks/FirebaseHook'
import Table from '../../components/Table/Table';
import Filter from '../../components/Filter/Filter';
import Action from '../../components/Action/Action';
const Page = () => {
    fetchUsers();
    const { fData } = useContext(UserContext);
    const headers = ['تاريخ الدفع', 'رقم الهاتف', 'الاستهلاك','العداد السابق','العداد الحالي','السنة','الشهر','العلبة','اسم المشترك'];
  return   (
    <div>
        <Filter/>
        <Table headers={headers} data={fData} />
        <Action/>
    </div>);
};

export default Page;