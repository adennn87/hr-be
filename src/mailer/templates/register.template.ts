export const UpdatePassTemplate = (title: string, email: string, role: string) => {
  return `
      <center>
      <table style="width:560px;margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;border-collapse:collapse!important;height:100%!important;background-color:#ffffff" id="m_8986478188185155053bodyTable" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" align="center">
          <tbody><tr>
          <td id="m_8986478188185155053bodyCell" style="margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;height:100%!important" valign="top" align="center">
              <div style="background-color:#ffffff;color:#202123;padding:27px 20px 0 15px">
              <p style="text-align:left;margin:0">
                  <img src="https://arcanic-ai.s3.ap-northeast-1.amazonaws.com/logo-text-small-min.png" alt="ArcanicAI" title="" style="width:140px;height:auto;border:0;line-height:100%;outline:none;text-decoration:none" class="CToWUd" data-bit="iit" width="560" height="168">
              </p>
              </div>
              <div style="background-color:#ffffff;color:#353740;padding:40px 20px;text-align:left;line-height:1.5">
                <h1 style="color:#202123;font-size:32px;line-height:40px;margin:0 0 20px">Cập nhật mật khẩu</h1>

                <p style="font-size:16px;line-height:24px">
                  Để xác nhận tham gia hay cập nhật mật khẩu cho tài khoản Arcanic AI, hãy nhấn vào nút bên dưới và làm theo hướng dẫn.
                </p>
                <p style="margin:24px 0 0;text-align:left">
                  <a href="https://chat.arcanic.ai/auth" target="_blank" style="display:inline-block;text-decoration:none;background:#2222FF;border-radius:3px;color:white;font-family:Helvetica,sans-serif;font-size:16px;line-height:24px;font-weight:400;padding:12px 20px 11px;margin:0px">
                      Xác nhận tham gia
                  </a>
                </p>
               <p style="font-size:16px;line-height:24px">
                  Đăng ký với tài khoản ${email} và truy cập không gian làm việc 
                  <span style="color:red">${title}</span> với tư cách 
                  <span style="color:red">${role}</span>
                  </p>
              </div>
            </td>
          </tr>
        </tbody></table>
      </center>
    `;
};
