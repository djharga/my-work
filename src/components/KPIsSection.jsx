import React from 'react';
import GradStats from './GradStats';
import homePageData from '../data/homePageData.json';

const { kpis } = homePageData;

// تحويل البيانات لتناسب المكون الجديد
const statsData = kpis.map(k => ({
  value: k.n,
  label: k.l,
  icon: null // يمكن إضافة أيقونات لاحقاً
}));

export default function KPIsSection() {
  return (
    <GradStats
      stats={statsData}
      columns={3}
      animated={true}
      className="mb-16"
    />
  );
}