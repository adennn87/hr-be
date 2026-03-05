// import { DocumentShare } from "src/document/entities/document-share.entity";
// import { Document } from "src/document/entities/document.entity";
// import { User } from "src/users/user.entity";

// export const ShareFileTemplate = (doc_share: DocumentShare, user: User, document: Document) => {
//     return `
//         <center>
//         <table style="width:560px;margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;border-collapse:collapse!important;height:100%!important;background-color:#ffffff" id="m_8986478188185155053bodyTable" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" align="center">
//             <tbody><tr>
//             <td id="m_8986478188185155053bodyCell" style="margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;height:100%!important" valign="top" align="center">
//                 <div style="background-color:#ffffff;color:#202123;padding:27px 20px 0 15px">
//                 <p style="text-align:left;margin:0">
//                     <img src="https://arcanic-ai.s3.ap-northeast-1.amazonaws.com/logo-text-small-min.png" alt="ArcanicAI" title="" style="width:140px;height:auto;border:0;line-height:100%;outline:none;text-decoration:none" class="CToWUd" data-bit="iit" width="560" height="168">
//                 </p>
//                 </div>
//                 <div style="background-color:#ffffff;color:#353740;padding:40px 20px;text-align:left;line-height:1.5">
//                   <h1 style="color:#202123;font-size:32px;line-height:40px;margin:0 0 20px">${user.name} đã chia sẻ một tệp tin</h1>
  
//                   <p style="font-size:16px;line-height:24px">
//                     ${user.name} (${user.email}) đã chia sẻ tệp tin sau với bạn <b>"${document.name}"</b>
//                   </p>
//                   ${document.quick_view_file && 
//                     `
//                     <div style="width: 300px; height: 160px; border: 1px solid #ccc; border-radius: 7px; padding: 8px; overflow: hidden;">
//                       <div style="border-radius: 7px; margin-bottom: 5px; overflow: hidden; width: 100%; height: 100%;">
//                         <img src="https://cdn.arcanic.ai/thumbnail/${document.quick_view_file}" style="width: 100%;" />
//                       </div>
//                     </div>
//                     `
//                   }
//                   <p style="margin:24px 0 0;text-align:left">
//                     <a href="https://chat.arcanic.ai/doc/${doc_share.access_token}/get" target="_blank" style="display:inline-block;text-decoration:none;background:#2222FF;border-radius:3px;color:white;font-family:Helvetica,sans-serif;font-size:16px;line-height:24px;font-weight:400;padding:12px 20px 11px;margin:0px">
//                         Xem trên Arcanic Storage
//                     </a>
//                   </p>
//                 </div>
//                 <div style="text-align:left;background:#ffffff;color:#6e6e80;padding:0 20px 20px;font-size:13px;line-height:1.4">
//                     <p style="margin:0">
//                       Arcanic Storage được phát triển bởi Arcanic AI<br/>
//                       Bạn nhận được email này vì ${user.email} đã chia sẻ một bảng tính với bạn trên Arcanic Storage
//                     </p>
//                 </div>
//               </td>
//             </tr>
//           </tbody></table>
//         </center>
//     `;
//   };
  