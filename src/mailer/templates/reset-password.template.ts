export const ResetPasswordTemplate = (reset_link: string) => {
  return `
      <center>
      <table style="width:560px;margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;border-collapse:collapse!important;height:100%!important;background-color:#ffffff" id="m_8986478188185155053bodyTable" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" align="center">
          <tbody><tr>
          <td id="m_8986478188185155053bodyCell" style="margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;height:100%!important" valign="top" align="center">
              <div style="background-color:#ffffff;color:#202123;padding:27px 20px 0 15px">
              <p style="text-align:left;margin:0">
                  <img src="https://img.pikbest.com/origin/10/02/35/687pIkbEsTthg.png!sw800" alt="" title="" style="width:140px;height:auto;border:0;line-height:100%;outline:none;text-decoration:none" class="CToWUd" data-bit="iit" width="560" height="168">
              </p>
              <p style="text-align:left;margin:0;font-weight:bold">HR MANAGEMENT</p>
              </div>
              <div style="background-color:#ffffff;color:#353740;padding:40px 20px;text-align:left;line-height:1.5">
                <h1 style="color:#202123;font-size:32px;line-height:40px;margin:0 0 20px">Đặt lại mật khẩu</h1>

                <p style="font-size:16px;line-height:24px">
                Mã otp của bạn là <b style="color:red">${reset_link}</b>. Vui lòng sử dụng mã này để đặt lại mật khẩu cho tài khoản của bạn.
                </p>
                 <p style="font-size:16px;line-height:24px">
             Vui lòng không chia sẻ mã này với bất kỳ ai. Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này và đảm bảo rằng tài khoản của bạn được bảo mật.
                </p>
              </div>
              <div style="text-align:left;background:#ffffff;color:#6e6e80;padding:0 20px 20px;font-size:13px;line-height:1.4">
                  <p style="margin:0">
                  Đường dẫn này sẽ chỉ tồn tại trong 3 ngày. Trong trường hợp bạn không yêu cầu đặt lại mật khẩu cho tài khoản Arcanic AI, vui lòng bỏ qua email này.
                  </p>
              </div>
            </td>
          </tr>
        </tbody></table>
      </center>
    `;
};
