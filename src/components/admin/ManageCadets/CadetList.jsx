// import React from 'react';
//
// const CadetList = ({ cadets, onEditCadet }) => {
//   return (
//     <table className="cadet-table">
//       <thead>
//       <tr>
//         <th>Name</th>
//         <th>Rank</th>
//         <th>NS Level</th>
//         <th>Platoon</th>
//         <th>Leadership Position</th>
//       </tr>
//       </thead>
//       <tbody>
//       {cadets.map(cadet => (
//         <tr key={cadet.id} onClick={() => onEditCadet(cadet)} className="clickable-row">
//           <td>{`${cadet.firstName} ${cadet.lastName}`}</td>
//           <td>{cadet.rank}</td>
//           <td>{cadet.nsLevel}</td>
//           <td>{cadet.platoon}</td>
//           <td>{cadet.leadershipPosition}</td>
//         </tr>
//       ))}
//       </tbody>
//     </table>
//   );
// };
//
// export default CadetList;