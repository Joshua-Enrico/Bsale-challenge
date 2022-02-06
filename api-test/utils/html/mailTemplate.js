function Html(token, name) {

    const embed = `
    <!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Confirmation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(data:image/png;base64,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) format('woff');
        }
    
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }
    
      /**
       * Avoid browser level font resizing.
       * 1. Windows Mobile
       * 2. iOS / OSX
       */
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
    
      /**
       * Remove extra space added to tables and cells in Outlook.
       */
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
    
      /**
       * Better fluid images in Internet Explorer.
       */
      img {
        -ms-interpolation-mode: bicubic;
      }
    
      /**
       * Remove blue links for iOS devices.
       */
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
    
      /**
       * Fix centering issues in Android 4.4.
       */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    
      /**
       * Collapse table borders to avoid space between cells.
       */
      table {
        border-collapse: collapse !important;
      }
    
      a {
        color: #1a82e2;
      }
    
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>
    
    </head>
    <body style="background-color: #e9ecef;">
    
      <!-- start preheader -->
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
      </div>
      <!-- end preheader -->
    
      <!-- start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
        <!-- start logo -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
                    <img src="data:image/png;base64,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" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                  </a>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end logo -->
    
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Recover Account</h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end hero -->
    
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Hi ${name} one more step , Tap the button below to reset your password</p>
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start button -->
              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href="${process.env.DOMAIN}/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset Password</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- end button -->
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                  <p style="margin: 0;"><a href="${process.env.DOMAIN}/${token}" target="_">${process.env.DOMAIN}/${token}</a></p>
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">Cheers,<br> Paste</p>
                </td>
              </tr>
              <!-- end copy -->
    
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end copy block -->
    
        <!-- start footer -->
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start permission -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">You received this email because we received a request for reset your password for your account. If you didn't request taht you can safely delete this email.</p>
                </td>
              </tr>
              <!-- end permission -->
    
              <!-- start unsubscribe -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">To stop receiving these emails, you can <a href="https://sendgrid.com" target="_blank">unsubscribe</a> at any time.</p>
                  <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                </td>
              </tr>
              <!-- end unsubscribe -->
    
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end footer -->
    
      </table>
      <!-- end body -->
    
    </body>
    </html>
    `

    return embed
}



module.exports = {Html}