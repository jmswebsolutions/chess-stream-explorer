import { Streamer } from '../api/chessApi';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (streamers: Streamer[]) => {
  if (streamers.length === 0) return;

  const headers = ['Username', 'Status', 'Twitch', 'YouTube', 'Community', 'Avatar'];
  
  const rows = streamers.map(streamer => [
    streamer.username,
    streamer.status,
    streamer.twitch ? 'Yes' : 'No',
    streamer.youtube ? 'Yes' : 'No',
    streamer.is_community_streamer ? 'Yes' : 'No',
    streamer.avatar || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `streamers-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToJSON = (streamers: Streamer[]) => {
  if (streamers.length === 0) return;

  const data = streamers.map(streamer => ({
    username: streamer.username,
    status: streamer.status,
    twitch: streamer.twitch,
    youtube: streamer.youtube,
    is_community_streamer: streamer.is_community_streamer,
    avatar: streamer.avatar,
  }));

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `streamers-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToExcel = (streamers: Streamer[]) => {
  if (streamers.length === 0) return;

  const data = streamers.map(streamer => ({
    Username: streamer.username,
    Status: streamer.status,
    Twitch: streamer.twitch ? 'Yes' : 'No',
    YouTube: streamer.youtube ? 'Yes' : 'No',
    Community: streamer.is_community_streamer ? 'Yes' : 'No',
    Avatar: streamer.avatar || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Streamers');
  
  XLSX.writeFile(workbook, `streamers-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportToPDF = (streamers: Streamer[]) => {
  if (streamers.length === 0) return;

  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Chess Streamers Report', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
  doc.text(`Total Streamers: ${streamers.length}`, 14, 38);

  const tableData = streamers.map(streamer => [
    streamer.username,
    streamer.status,
    streamer.twitch ? 'Yes' : 'No',
    streamer.youtube ? 'Yes' : 'No',
    streamer.is_community_streamer ? 'Yes' : 'No',
  ]);

  autoTable(doc, {
    head: [['Username', 'Status', 'Twitch', 'YouTube', 'Community']],
    body: tableData,
    startY: 45,
    theme: 'grid',
    headStyles: { fillColor: [66, 139, 202] },
    styles: { fontSize: 10 },
  });

  doc.save(`streamers-${new Date().toISOString().split('T')[0]}.pdf`);
};
