'use client';

import { useState } from 'react';
import RedirectForm from './components/RedirectForm.js';
import AdBanner from './components/AdBanner.js';
import { CircleOff, DollarSign, X } from 'lucide-react';

export default function Home() {
  const [showAds, setShowAds] = useState(true);  // set to true to show ads
  const [showModal, setShowModal] = useState(false);

  // Handle the showAds button click - show modal instead of directly toggling
  const handleToggleAdsClick = () => {
    if (showAds) {
      setShowModal(true);
    } else {
      setShowAds(true);
    }
  };

  // Handle modal accept - toggle ads off and close modal
  const handleAccept = () => {
    setShowAds(false);
    setShowModal(false);
  };

  // Handle modal decline - show alert and close modal
  const handleDecline = () => {
    setShowModal(false);
    alert("Cheapass");
  };

  // Placeholder ad structure - you can replace this with your own creatives
  const sampleAds = {
    banner: [{ // 970x250
      html: `<!-- Sovrn Creative creativeId:"26200200_EAAYACogjtuLGvoRertvSmfLqEC.E8.9QnoG19ELtjHLTaeISBcyBKG1GGw_" seatId:"200" dspId:"26" siteId:"754092" pubId:"260380" referrerDomain:"www.lameteoagricole.net" deliveryType:"display"--><iframe id="amznad816754" src="https://aax-eu.amazon-adsystem.com/e/or/2fdf62ab27c1174e7ef53f260727f8be/creative?b=JJP6rzLoLNXRDHLbQbVkkW4AAAGYMGro4gMAAAeIAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICAAXMbG&bi=cfv1_CFiGf0svg_Wl-FGnd8Im3z76XE9AaLA6zHdghVXCZFu2I9z1Voxc9KN4hyxDlT6uhqM82JkbnXLU7Uy8ZwZ4AFdlZ6H-NJOTeotjKTMJYFSADaNskWFfoddKLkS7ZLfdbKWlEjXSlNcBN3wZpW_DXnl1Hohla6IUPysFNZg9XBeFtJOjj1sgXlyzA1GAU9IqRWoCVMHTk8lTb1ZhPMN9ecI3sMKn6yFKc3CZmWlUji1_B3K3KGQ55rVI__hLfeLi-9kIVYwbJ_7EN_W4zqQ_3pYpsZBTRf6soojM247XH64nMVul1q7fwSa_dxPCBI276fcf49pjV9DAi7GYV6HsUYMqje8vBGc-8OtI14VkVcZRszU9BxCt5EHvoMlaJkrgEBE31hkZ9ANWxQ3OL4-ncVt2dpyXx4o-dLdFYUVpxU5bEqIJ5EAARyQwvNIkJg9vK6XQftr6pazkBiQRViiOh5FRWU2VjF61ai0bNoZ2s8elCWtS1dbc6S6zYUdFCtLp0OtM9g0DFq5KgRGZlBHBhk_2fhR_f0sbJinAfhbKBfHZSGSdBwU4-WAaBcydGmrkRfEjtMOYCP3f2a6-Ffr7dSpPTtwS" width="970" height="250" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe><img src="https://ghent-gce-nl.bidswitch.net/imp/0.3337/BSWhttps_A_B_Baax-eu.amazon-adsystem.com_Be_Bor_B2fdf62ab27c1174e7ef53f260727f8be_Bimpb_Cb_RJJP6rzLoLNXRDHLbQbVkkW4AAAGYMGro4gMAAAeIAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICAAXMbG_Jw_R_I_WAUCTION__PRICE_AHMAC__SHA1_X_Jbi_R.4c0d5Az5LMHjb4iHQg35pKEXVKPjF8a9H7e0tD9A18cP94XWW5u2Zy3q9oG0VmX1W4KYxe62OvoF0TeFrZpeLvQN5ZQfBqdBvxEGeZ.K5RODjca4mD1cJBJhz-Y57c5a.Kn7eNHPckUZKC4HmJdbIuBVVV45Euzf3j6K5Znfww4pKkwtcC2tz2r2ktfY3E4MQ-Ngwxi2H2Dtr6X0TLYMUAAB6aijPKy12vk5DkM3vfOmlDZF8MP4O5U7YvRjgGp4nW1ADC3rr0EkYfNJPzl5QS5oe8O6hQuFiQW-BHY0mzZ-8gC0B5OhmYf2zQDF3vttAlVmm1YTOcJ.yjlZxAzUvpXausShHh4l.sziNzP5uErRKNbAiKzvcp2Xxzthfmb9MWknxNM8yRTGfo-xlkhRaxIs.Zgh4FirOuzitwvnIjQ3lx9GJP2lf0GZHBbJunByLP1QGaOlReqZvCjuOismQ57k.3M-ElBFEnmO2CPuLpmsO.OHvcajUXkW-cswO3w4w6abeIbwVlBASAp4yFz0O9gUB.qH4dcJXFS3QfQnIM8NW0o7LRh.aNraHWJNj5kRARSbdPFKs-bF9b1u1ZOTRZetN3HkdY4dslzSU.z0xMXM72mvOvznBk7jgNuaBmOH4vkMWWCxZqiSmEjG6Ib5VzpC2FSVnjH3.xKfUEA46jO4AxPcWTrSNzKYuekTRZwVhihaSG-1.dU0.-sMSkJNg____/cVCSI7kqBSscx1o7Lae5znnp91CFoOVLGoL52CyFzLIUsbYdILbnLp7WPDoJDud2rYSfVt-0cPI9yTZNEYWHhZm22Ml-Q--XqxF2fuD6cehoNVXZ0i6kVFftmySGBHtKhjqDcpE3L--MQbSKCYcyI6bFQwmiEZUGrQPJ_I0cH0Y04EHEY58qVohnBU-50F9vp4T46KrHvYrKC7DiZlrYOxlGpT6Z5vkRvvkmf0t6B7pFTGy0OUOoUGoMptyGRmnNgsvcr7apATXqA29PoO9TQXwHYRUBM1JZHfZWy2dBAMuFU5Z9EJSwhZ7z9N0YDeD5dmavGgg4hLjh4wqeL46YeLF_KFTE0_eqVo-Y4O9MuYCzirIPSERF9ApcQG3m_brHNMFF7jYvb2UvStRkxTihX4kBbgeAH584WXt_TjTINOxEM8bXRbOLmEjbSHjaAjLOy1w7S7MqpFbnh-Hxpcw3PH7Ro1miIXA-j9AeoobIslLFOsFXo87IC4N_6Il9mZL9sl1UNg00gw53vNSI8sAFQC9nLSzmYPGjA87WTNFHu-Qv3WEYcPsn2blZioPH9zFl_NfKO7xP-BdQAY9TUCpMklrM36GNUCjesJwbsAt3gQgU78ot4a4joNV-ACj9ZRx4Fg9TXoWBTsvJ_75chMGLh3AAtBB1Mr_Y-8ahLHNR8Iem5EMC35FhaDdxxqr_PQBVo9v3BqbmROqNgx8eoBjse2HOCD8kXaC9xNExqQ0ISsKpfu8mJIJ2ZO7KkCJghRtPUO5q7BW1ylEWSFWpoEpDJgg1z-ICgqAEmqvJTaF7cVmZm8R3SJ_OAYNCXQrNDYvT2xG-CV0VpzS8JAS6tNXRg6ky3R0MejW7T-NpcvfkbdiZ1y3Fck34QseOlS3101Hzt9QBxSWwL2RpYtR4qUtvNcEem5m_FFc4vP07enx2jGpbI_sxtCFJBP8sR-_FylQM_m53-UfkLqNkgc4i0XgJ--qWIpJ2Z2iodUhOXqXw53KVALu_zWPqfE-SndGSbgAXghsRh3OvwAXabZZetRRA0uXMg3TAiABG8uGzwdDSWLMKuY-xF2wjMm-TkYBXPpVRqiOnglUvq1JyEo5u4YYNyjGa9KfyoV1_eaECfmZCAjZuERmTLyE4RNfs9xxHwWiIg1g_8YdT2o_LewszGGvgAbTYQ6cWpwf2d1auE5pWw2KJyunzoNrQd1n2ouykEeV-8Bt4ll6xfXSDExc479ZLGnOz3BSDafrAc1b85rfu0Gg3WooIUTs_XFmhskAYXiidHRGIidu539ZHE1iklTfP8lBJex5XMLQxjTD7I5Drpvvk7iF6sWP-DS6G3chVJYCPInQuRqL5RsgdZ1lXKYpuMIFCf9yE6A1ZZbgdmWgvTjHJKCX9UkJrhtAQzzH-gPdhLs4HUhKmDf-JvugoqroHa-u-gR9am2Fgmbl8NNz4g3AQGMtgjDNh4HrTS6KxB-jcdcQh8HwFuHUJ27InylHAWRZW7rKQZC4hLhkzldYbCCbEFQhUteEn6lfHugThU_uJe_ZzOaWfR4h8qcFldR1czRjWGfnHKJzRlFUeP-foeo4Uu3xmtEn9VQUHYipYBlI_7FQBkaQHg4hf3wHNCL4xN9lNRNMLG-JLmN9saykUf1nwSosftxafzdT9-YkG52ZKfzK8KFSWCuT1cS8D3j-CJGAK_jkTJiWYDeRedBpvBtUTHucyixNTKIIOAZECchofEvxoeeiWL3R4SnU30ZrlBC-F-YDNz9Uzp441R_zpayIYVMRAKVuJ9wqWEUISGqF8PDXdCPmDsoKNfQ7-SwHtxQ6ncmmMbdxG42PlemrKj-n1us8KVYlJDCfiRTuCdOZoJuMLAWczkZ_eyVGe5OG9eBnOTtIZVg6_7bjRO4-JjVc95uk7njEipj3k0GyIoamrjE0FiXBAhvhZLkGW98ZJpPKNvnMA8AbuKe9znl_60x7lwgQ8-iwzOrLS4Xagix03mhqKGL8kLu9RyVosrMDuFE3ClaGBIXqyCibsLUN2vqv4V6Kfxgr9FKh44o5v1N3DaYw1w2bjx0yvKdaKCaQiVMkeLdDnkMpxIoeeOp0I8zXn3QVLWNcVFM7ukjVbcyrps5JJJ5JodL69CRPt_aW00lhI_x4r13IcSgvA45QyZHyG2SQYCiHHDR5oBSXmKhvAwUaDPZ4WY9DdRnxI2vcL7Wavfb6yyjbHcxbD_gaLzl_wy-AQ32TylIPtR-mTxvM/" alt=" " style="display:none"/><script src="https://pxdrop.lijit.com/1/d/t.dhj?dmn=lameteoagricole.net&pn=%2Fmeteo-heure-par-heure%2FRoubaix-59100.html&ipaddr=92.184.121.8&pubid=appmonet&v0=260380&GDPR_v2=CQTkFgAQTkFgAACAKAFRBvFsAP_gAEPgAAqIJvNB_G_dSSFj8Tp3YftkeYxH5dAz7sQxBgaJA6QFyBLEsJwXgmAAIAiKAKAKGBIAsgBAIQBlCADABUAAQIABISCMIECQAQAAJiBEAAMRAmJICBBJGQAgGAAQglgEAhQAgAsESFooQNhAAIAABQAAAAAhAIABAAAIBDgAQBAQAAAAAgAAEABAAAAAAAAEABAIAAAAAAAAAAAAAAAAABBN5oP437qSQs_gcK7D9shzGK_LoCfdiGIIDRMGSAuQJQlhGCcEwARAERQBQBAwIAFEAIBAAEIAEIAIgACBAAJCIRgAgCACAABAQIgABiIAwIAAAJISAEAwACEAkAwAKAECEgiAtECAsAABAEAKAAAAAAIBAAAAAAAIUACAICAAAAAEAAAgAIAAAAAAAAAAIBAgAAAAAAAAAAAAAAAAIAAA.YAAAAAAAAAAA&us_privacy=1---" async="true" defer="true" id="pxscrpt"></script>`
  }],
  leaderboard: [{ // 728x90
      html: `<!-- Sovrn Creative creativeId:"805686:3276025686:577931671581766033" seatId:"5686:327602" dspId:"80" siteId:"754092" pubId:"260380" referrerDomain:"probuilds.net" deliveryType:"display"--><div data-rp-type="trp-display-creative" data-rp-impression-id="4a8366f8-0bdf-42de-abd6-743b571bc911" data-rp-aqid="5686:577931671581766033" data-rp-acct-id="17960"><div style="width: 0; height: 0; overflow: hidden;"><img border="0" width="1" height="1" src="https://aax-events-cell02-cf.us-west.3px.axp.amazon-adsystem.com/e/is/bb8e6d0b6c85b2b1fc673047a9802fc9/impb?b=JFDDjh5xC2uI-uAxSrHqQCQAAAGYMHwfFQYAAAakAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICAtsDHT&w=9C583AA3C6463393&bi=WzUSd9yY2tJnGb2zAA5dVtZw.1p6u0qzwA4jjz57prc6WSj-lFIimQmxXVS1Ti8SdRmyOIAKIipa4Q3cbH8hih1BlzWRPq0XAAmmtzgBQFsx0TwvpgtKuApM58WapWJL6RNGWDBQ2KzjSEOOmLZaqAeuxofVezep3TI-GjZXRNMUhoU8f.1iIFnCFp2li7UrkI9BOlZu5s9pfKYE4D6go52kKyjg-C-5qZ4jRmwab1wYeoFozKkc1JPBUVLbKxOGVDd3agaVDbW1fgfrbc1-DAqRYk1XvTDFpEmsmYz8FEPfLSESw.-2hE1MI7HO7HXI2ac-FzJ4Ily4nXlFbX6uhtg.SX-Qs0etMAjD.KbbrYvRLFIpO1V01OjFM9afHmdHQrNsjFRtvnUk2a.4p4-ILqC-09uGaIaMFhEOWFRj9LhRb2lyxFYh8Hba-PmH0L.Dv1wBkoVscq-n9mNNWEPo2LektfNu27UlrdVkkRXf1QQAsLK8ISwS-vblc56UrALNvM2zKoLpx0QME3Jh839uvx6nvM.52mHO4UWQX1fOa31Wb4fST5D.weNTZ065IpEy8sTqT7BVwLC0tnw803FBGPfoAQzo9i2ax1oSx8VkIcztSZpU3BUqVD9SZf.STq52vRoykAiuzk8J7DNxXZLVs66ouUEk5hXhK.CsESzKAn016ECw5zN2m2bPo0j3R8AT" alt="" /><img border="0" width="1" height="1" src="https://beacon-sjc2.rubiconproject.com/beacon/d/4a8366f8-0bdf-42de-abd6-743b571bc911?oo=0&accountId=17960&siteId=185824&zoneId=911674&sizeId=2&e=6A1E40E384DA563BD2E495DE5A54681EF7ECE56E30A2FA9D402C41FA75142D81C9AD57DC93F17B393B3F7FD1D24B44338F7FACD60636634BA06D2B7EC25E4D228C8415A32D855980ADDF31FF1479BDB320DF46D78F28EE13F0F7DE9C2AF40EEF459CC0D656169EA930DAE7E9E96767AAEEF5635E987CFF139197B19E828EC73B87DC65EA5D058525163DC82A61F1B7C33EF83CD9492793C046189229129DE050A0062A021440CBF3FDE1025E4A6B343C7B45B6D38A0E3E9E18E04A05B50870C1" alt="" /></div>
<iframe id="amznad805067" src="https://aax-events-cell02-cf.us-west.3px.axp.amazon-adsystem.com/e/is/bb8e6d0b6c85b2b1fc673047a9802fc9/creative?b=JFDDjh5xC2uI-uAxSrHqQCQAAAGYMHwfFQYAAAakAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICAtsDHT&ct=https%3A%2F%2Fbeacon-nf.rubiconproject.com%2Fbeacon%2Fv3%2Frs%2Fsjc2%2F0%2F4a8366f8-0bdf-42de-abd6-743b571bc911%2F0%2FRS8FX2zXL_tB3ikjQ_ZhLT8ioKo%2F&bi=cfv1_CFi4HHUWhu6HxwH3WLlx7wzzW31je5gczFtihVXCYzftI9z1VpJA56F_hiBAkCrygaUnhvtAnXzOsDynMYURJTqpWVvjbuH8MlAodm1QYVqNOd1W5Wq09JEPHFSGU4-ea_XjBxb6uc8IBnDp8jOPUWJrEGoNLOZ0WVE5BIwTeAqF1tWooC_wNC3WeXEnWvYLY5u5sEJVNlO4IguTq2eXvCyqYKjYdlvC6Y0JtVxInJXjBnzlKHNfJtBB8G-D_ApjC3P2NODD5yFe-EEBPNhwdzqweWaJmBfNIP2Rtuy3FdFvb0utwPzc9UfWIFXPQ8__nagSuesyEoidy8WEVKa6VZUr2-1_xFBR9c8h4PNVPbFgxUNyYBb-vhThpZEdBwO9V1g11APZxCVW_HCtWO_MR3weRZvjipA8IuYfPF9xowEcC-FMsR9cF2UYqJ50bE8kPKaYe5K6ofn4SyISV2jJ3oQNX0fMnF_2fCRyYcol6aqBOkVkwomZ_CSxTGN-Nc2OrrZu3TEBIY8l2SSYj1gCpVLTWipNb1UZLpWiJ44zDxPkF9kbAL8fhw" allow="private-state-token-redemption" width="728" height="90" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
</div><div style="height:0px;width:0px;overflow:hidden"><iframe src="https://eus.rubiconproject.com/usync.html?&us_privacy=1---&geo=na&co=us" frameborder="0" marginwidth="0" marginheight="0" scrolling="NO" width="0" height="0" style="height:0px;width:0px"></iframe></div>
<script src="https://pxdrop.lijit.com/1/d/t.dhj?dmn=probuilds.net&pn=%2Fv2.1.355%2Flol%2Fprofile%2Fna1%2FBeef%2520Briskets-NA1&ipaddr=66.91.231.155&pubid=appmonet&v0=260380&us_privacy=1---" async="true" defer="true" id="pxscrpt"></script>`
  }],
  mediumRectangle: [{ // 300x250
      html: `<!-- Sovrn Creative creativeId:"26200200_EAAYACogOo83LOV1tv1J230a6AzygAacbTWHzMs7vg1WhhYQQYMyBOwY3Ds_" seatId:"200" dspId:"26" siteId:"754092" pubId:"260380" referrerDomain:"www.spurs-web.com" deliveryType:"display"--><iframe id="amznad475934" src="https://aax-eu.amazon-adsystem.com/e/or/2fdf62ab27c1174e7ef53f260727f8be/creative?b=JPvUqyCoW7fAlcU5_kehDdcAAAGYMDmJHgMAAAeIAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICDZRlkm&bi=cfv1_CFjAaGkrh8uq6RT7cdk9_ySVei5WdOMqzHdghVXCJxr7Idz1VpJD5btvgGRbkTvyjK8-hvtAnXzOsDynMYURJTwDXuv_bLiLOE4sd2RhYAWLHapY5hUuzzkBHw6KC53ELbeMPxHxz6c-G049nFD9XoglVTROUPlnJHBnUrxtcC-Y8vrPswkXfwSgSWeCQcVhhvr1GIb-6Fb4tvXJ8TakBYWAUE57Fi3i4nmh-ETBYuCPN3wI1S1VzZyzH7RRpMItclHWDa7pshd11VAXZPxHQxmvfWW1iyPIP_6A_K_uVZUDfhn8kvvC8xuaIFnKFtrmzP9H8aQ0Q4qB0srUU_fxAM8nhbgqUGM-8v8XQL0KSvtk0khEI2KYwyi6kshcJVHmEkVuiTzBnHhJ_W2xU-7PAzseA8-g0Nh7IfIVIlsp5kpRDeJIoRlXWGBs_5pnel0tVPOcaMf6tPOjTTVTCCiD3pcaXE_R2gGreS5lOIJi5sOlCGkaltn12BfGUUdbEIep0tV_zjoBNo5IpCCoz2yCyzFFPktIf18MNjebXAxim0ddNopiVfY_zDnL1w" width="300" height="250" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe><img src="https://ghent-gce-nl.bidswitch.net/imp/2.126/BSWhttps_A_B_Baax-eu.amazon-adsystem.com_Be_Bor_B2fdf62ab27c1174e7ef53f260727f8be_Bimpb_Cb_RJPvUqyCoW7fAlcU5__kehDdcAAAGYMDmJHgMAAAeIAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICDZRlkm_Jw_R_I_WAUCTION__PRICE_AHMAC__SHA1_X_Jbi_RD6EguRMnhlLUixutVV3MQnLfPHKmxzUn8rpuL00PJZZ724zcqu2WIZ2eDaWU9whzJyzyhGnjNs9jAieAHkR.zQvjfWtPIQzmNADEp2ZurWcWoQ8xxiGV2.ZqOYfpcapDi0cGWAnBA4w-UhDX.JaQ58IVxOzqJm2JY4asMt0zEFlBqqwtXRDQ6xg.kIla8xBzmKjEkKVwk7Gu9s0fu4nbLWy8KVFLJ6LSlNBiQAkz0NF5cQ2amsp6pWSqUlFqSisAPmjebtAb4GfdW9xrfbhA9uQbUPwfhgWaHejy33QX0ozyMb-JUkuc6wdvOY-941Le2hxH2wCs.KZl3vijrWHdsNjaPkNwafRHJvhFoMl0VV-gVPY1EL32lFuAomJIAjH3kOtbfIxQXNoYQ1M0UTlcGTYLJ.9O70tYhr5k6z7Zn336CNmiGBjD04R7XrzyemTPTGs62D3ZYe7cUJAdVDqC8O8s5FrNI9Ce6IJhrINFJ1Y-nZVmbmfX.DT6T2JBReefXYbNk6Zgfc92C76GK3QlbuD68H.fazJndf41w6tUSSk9j9ZrBYAI6tmPPRbeCQJmOELF54j4fl7qp4Y-5o7Gk8wxIPsBvBqT0NLU43jSsl-dzFVkPB59DVpyX4TaEoAmVNjzMwU7goNSATa8kdETx94nSz0VD16frkzYqGr4pVAaqqdkAA19bpFW09dyCLPATTxcHmQORrxarqt4nkhe8w____/hKpHJjPxHKd1wM9uMx4bzFVCvc0QpGF5vkJNXuBDzDyTsXgL3l9KQzTs0dD0qbtNGhQjvkVrvPGEq8OF8AYhHCvO86fQRAA6lJfsMB6ppwiE56m4ntFGPNkaqAFxnCD40TkktJ8ltiN-M3pIFvsqYV3ga5AypJDpdAogpJCaD-CdT43jfepo39UGocHkBEelxaTIjjb3H-4bsuhMhloyMWhyhbY37cUXFfz-kaNuz0xDvkm6b5t4oQ5hi5GD7NxTmw_SVs_El9n58dVqxleHr6MdhAV_rAAkCUHHohUBwtCVsTVyoVAiHLzlWpi6VI8HM8WqsSAmlR8Yh-utXghak4LlV2zh4SJIg3GIsdqAfsNQqsRrsnKZ8u26xi5j10Kw2rQT49t3OH7qyP-sIi31Cro7ompqZg7aQrbvtpcshOK0Mmlil69d91I5DB5UKM5uudY8ujc1LET1v3iFNdq2eiQAMBFCNjkbv3qUuI4qvlQab09rhnxJUTMUOCRWDNwHBwQOB6tn0ie6exzb8HFeQ6Q2Fa2SorN1XYSQ-Ft5pdbEYNHF9fGB4UAiEh89kX0LXe8YIsw9l9boJQSjTJlGnqWT_y_sGgrYYQSnri4R7gCtVDdx9rik4SU3DjtokT3jGeVbU5CvvYP67_SBPK1pIyUb_llJqPqCmF4L5Vg7dpatduynbCkFwhPHin3Cww6EOTdEcQCcKyzwGztqh5DwUTkqqTHUDK-JgUSeR3PGcMspg2Q7swNxoc9KOyRu6rUucw_Nte2Cd9-TFlzLtFYuyi7uf0ELiPl4aRFRRnxUeghOQZztMGZtxrb3igAWI95YvDCknH1vN4as1Saj73swbTQ-IOPeap4CEbMOqJJEFutsSF4nPj8DxPC-2muMn5oxmzpRDQxXeH16pqOp0BH0kbMPXhiTf1O1UiLBmszCUrdlC9taWYX1LXdYVTp_NpQWwC8md3f1Ji0fZJ5nhlsir_antfk0F0_iYQ1BoADWESghphW8vADSJQOkLh770QoDwqOVHoJX-lFGvGzOayv_5rlAGY8lPFqtps07-yGcjC9v1wT59q8P8IsjrhRXO5akUeroF0pozvJ_SoXlwtsm_xXST8XoS3LKdcqxb8deCb-BValzKn_ox9K5KqxF3Fh58PtvcItAPRHhjPae_Tfu9-y2_I_pUStWPz7h7QnXpkHVCiUt9J3S6aqAF_tKFPE4uG-OvK6c0dU8vuGrET1HMhAac0RNdmMPH8cZbWQuHYSoPQXdGNnafs1JCK1edB41hH3MIzXHRpHrGj42aRhiwUAiw_9mP7XXnsQUi__g9KsFk7wiq4Vuh_9aUN2pUUODPiUVdapt5agntDXa7vWbaF99TTp4lTQ6Biw4jhgr_6_wY3CYTa3JcgEd5P9DAOvHo_wAceZrcIYeePGpacfQUOZmRsPclnqWoXUBEUmRUu95kuQs4t6-CpCIL5as0Y9UQ5UHUDAHkc9Myqp5-CyH0sOdIeDmwlYRRRZlBzAUUowf6JidVP6SHxkhmyDtBDo0vEEjWd6M3LkDbFTx9rmDOa-fIPvdNvQrGbFGnQVC5fZFvHGf9B8-Z0TyLDv6UtD2GgKsxPB3CrZd7hevLU6UJ58EYRqVFaSNcA2gEAMovxZfKUNkWG_eaNEc2B6_IwLb4K_ojjK5D8SUZ85lO97nRx8xytRpaMxy7OutbPTpdY1TQtXConez1uez7pJNtQzx4WfhXwFc0G1-klVLMiIZBYXL_H7CnYcU4bagkIt4W5R3jOmuPavvZGCtoD3GDzm8Doqo57nYyNZFNYq5ryskduUg08Wmj2oYDaqPwqckIM00MAdEGiLOmp6RDeK3x_Z2e4CY0ymbIA4n9eA1T6sB64pjLTtJkZc5Jgs2czercxRQ5maeDKhK2nGCsayIfp8AL7xTyYBVag0Gn67AHw0_dW4D2GiFPNHildYKC8rys3NNeSiCjB0W9s_OxsnEs6O9LFjyHUYFNTZQh0B68nCkC_25Q3xMXIj44BpRVccWPq5mjm0pucIupYyyNO69PMupigE59IxcYoOsRyFFPxW3H7glnvolRCmjf2pttEFQtW1gtoxfKCGRIqS4WfVvuaxnXgCn9_qRTmYsgvoITmuhtlStP5o68ZJxlxEqaaxX9fAOaiJ7htuFOPpdt8ytCzxm5rhwBoNijcln_-6_OjUanFJUad5ocnYqMo_RPcugHtes1ulawuJHYvKYn_H1lA/" alt=" " style="display:none"/><img src="https://gce-nl.bidswitch.net/uuid_mismatch?context=eyJkc3BfaWQiOjIwMCwidHJhbnNhY3Rpb25faWQiOiI5NjI1NjQ3OTI4NDExMTcxNTQ1Iiwic3NwX2JpZF9jcG1fdXNkIjoyLjEyNiwicHVibGlzaGVyX2lkIjoiZm14XzI2MDM4MCIsImJ1eWVydWlkIjoiMTEwOTJhYjQwODNlNGVmNDNjYTgxM2I2MTYxOTQ4YmEiLCJicm93c2VyIjoiQ2hyb21lIE1vYmlsZSIsImRzcF9iaWRfY3BtX3VzZCI6Mi4xMjYwNjEsImRvbWFpbiI6InNwdXJzLXdlYi5jb20iLCJzc3AiOiJmbXgiLCJkc3BfYmlkX2lkIjoiLTlTcklLaGJ0OENWeFRuLVI2RU4xdyIsImJpZF91dWlkIjoiYWJjZjQ3YWItNmVhZS00NDVlLThlYWQtMjAwY2ZjY2E1ZDVlIiwiYmlkX3V1aWRfc291cmNlIjoic3NwX3JlcXVlc3QiLCJzc3BfdXVpZCI6IkhWaWVxUVpIUjdJNGhmdTlRT3VGSy1kMCJ9" alt=" " style="display:none"/><script src="https://pxdrop.lijit.com/1/d/t.dhj?dmn=spurs-web.com&pn=%2Fspurs-news%2Ftottenham-fans-will-love-what-pape-sarr-just-said-about-winning-trophies-and-heung-min-son%2F&v1=2a00%3A23c8%3A4ca1%3A5b01%3A92ed%3Acd4b%3A5317%3A1ef1&pubid=appmonet&v0=260380&GDPR_v2=CQJukcAQJukcAAGABCENBUFsAP_gAEPgAAwIIzFB5C5MQSFBICJ0IJoAYAQVwBgAIIAgAgAAAYABQBIQAIwEAAECAACAAAACAAIAAAAAAABAEABAAAAAAAABAAAAAEAAAAAAIAAAAAAAAgBAAAAAAAAgUAAAAAAQAAQAgAAAQAIAQEgAAAAAAAAAIIAFAAAQAAAAAAAAQAAAAAAAgAgAkABAAAAAAAAAQBAAAAAAAAAAAIAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAABBGaBYAAGABQAFgAVAAuABwAEAAJAAVAAyABoAD0AH4ARQAmABOACqAH4AQgAjgByADuAHjAQcBCACLAEiAJSAZwA2gB6gEyAKlAVYAtYBdAC8wGMgMkAZYA2gBuYDgAHLAQTAjMAYEgBgCtAHsA3MKALAAUACoAHoARQB4gEIAPUAugBjIDlgIzDoAoAowBWgD2Af2BKseAMAACAAoAFQAPQAfgBFACcAPEA9QC6AGMgRmHAAQAoEIBAACwAqgB-AHcASkA2gCrAH9koAYAowBWgSrJgBQAAgGcAWsAxkBwBSAIAKMAVoD-wJVlQBAAAQAFAAqACKAtYBdADGQIzFAAQAUAAtloAQA7gFWA.f_gAAAAAAAAA" async="true" defer="true" id="pxscrpt"></script>`
  }],
  sidebar: [{ // 300x600
      html: `<!-- Sovrn Creative creativeId:"86rtbhouseAz35P7lE5X6fJyNAnPRD" seatId:"rtbhouse" dspId:"86" siteId:"974919" pubId:"249425" referrerDomain:"www.independent.co.uk" deliveryType:"display"--><iframe src="https://ams.creativecdn.com/imp-delivery?tk=JD5up-YJpVyHKnTz-HAltINJ2rphCJMpJZdnFbyx99pWyQSERkVsdARtyAEFOFn-5ClPGZuOsI8AmDosQtmR-p9oP53KK9VePD3_iyp_2gBWjQUWCyw5lVey64qi8s8rqbDbg3BhUT4_tNEdoiN3S8MPU4rWaY6MdAWrJJ2kV0k4vXyuGHyMYRgDzBN7WICNGU3NO2SyOtcD7vw74bkmo2bKB2HYdVVXHpQMLUia6omN90DasJycxJ-j6tnwerQ9fsyLJ-U9w-QCH03CrR5JiUPhaCikvP6fToRCo94D5yo9k5KQ6Q3PDkMPlCcydV7DlPB6SHeDz9UpIbCT3-08NTL2pJdYrmY32XB06Br3Ip_CsL6k5HSh-NGSC6Co31wy&amp;curl=https%3A%2F%2Fams.creativecdn.com%2Fclicks%3F%7BEXTRA_CLICK_PARAMS%7D&amp;tdc=ams" width="300" height="600" scrolling="no" frameBorder="0"  loading="eager" ></iframe><img src="https://ams.creativecdn.com/win-notify?tk=JD5up-YJpVyHKnTz-HAltINJ2rphCJMpJZdnFbyx99pWyQSERkVsdARtyAEFOFn-5ClPGZuOsI8AmDosQtmR-p9oP53KK9VePD3_iyp_2gBWjQUWCyw5lVey64qi8s8rqbDbg3BhUT4_tNEdoiN3S8MPU4rWaY6MdAWrJJ2kV0k4vXyuGHyMYRgDzBN7WICNGU3NO2SyOtcD7vw74bkmo2bKB2HYdVVXHpQMLUia6omN90DasJycxJ-j6tnwerQ9fsyLJ-U9w-QCH03CrR5JiUPhaCikvP6fToRCo94D5yo9k5KQ6Q3PDkMPlCcydV7DlPB6SHeDz9UpIbCT3-08NTL2pJdYrmY32XB06Br3Ip_CsL6k5HSh-NGSC6Co31wy&amp;wp=0.612726&amp;tdc=ams" width="1" height="1" style="position:fixed;"><script src="https://pxdrop.lijit.com/1/d/t.dhj?dmn=independent.co.uk&pn=%2F&rdn=independent.co.uk&rpn=%2F&rqs&ipaddr=92.238.179.0&pubid=RichAudience&v0=249425&GDPR_v2=CQSldsAQSldsAAGABCENBsFgAP_gAEPgAAiQLAMB5C5MQSFBICJ0IJoAYAQVwBgAIIAgAgAAAYABQBIQAIwEAAECAACAAAACAAIAAAAAAABAEABAAAAAAAABAAAAAEAAAAAAIAAAAAAAAgBAAAAAAAAgUAAAAAAQAAQAgAAAQAIAQEgAAAAAAAAAIIAFAAAQAAAAAAAAQAAAAAAAgAgAkABAAAAAAAAAQBAAAAAAAAAAAIAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAABBGaBYAAGABQAFgAVAAuABwAEAAJAAVAAyABoAD0AH4ARQAmABOACqAH4AQgAjgByADuAHjAQcBCACLAEiAJSAZwA2gB6gEyAKlAVYAtYBdAC8wGMgMkAZYA2gBuYDgAHLAQTAjMAYEgBgCtAHsA3MKALAAUACoAHoARQB4gEIAPUAugBjIDlgIzDoAoAowBWgD2Af2BKseAMAACAAoAFQAPQAfgBFACcAPEA9QC6AGMgRmHAAQAoEIBAACwAqgB-AHcASkA2gCrAH9koAYAowBWgSrJgBQAAgGcAWsAxkBwBSAIAKMAVoD-wJVlQBAAAQAFAAqACKAtYBdADGQIzFAAQAUAAtloAQA7gFWA.f_gAAAAAAAAA" async="true" defer="true" id="pxscrpt"></script>`
  }],
  stickyFooter: [{ // 728x90
      html: `<!-- Sovrn Creative creativeId:"26200200_EAAYACogOkRlNgHlo7.Q-Hj.bGKxuh0SfYcQX-t8lWVO6i769doyBKq2BHs_" seatId:"200" dspId:"26" siteId:"754122" pubId:"260380" referrerDomain:"www.tuttocampo.it" deliveryType:"display"--><iframe id="amznad51756" src="https://aax-eu.amazon-adsystem.com/e/or/2fdf62ab27c1174e7ef53f260727f8be/creative?b=JBE-MQocgXuAXPNXFMBWa-sAAAGYMHTBHAMAAAeIAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICCp4Rmc&bi=cfv1_CFioBQ4hjei7yQX3cOx9mintX15JSOQqzHdghVXCIgrOI9z1VpJE4LppnCpNmSmzwaknhvtAnXzOsDynMYURJT4DXuv_bLiLOE4sd2RhZwuIHapZ5hUuzzkBGQ6KSY-cOO3hABf7s8Vtcmshl0v2bUt--SNpf-9BWUNMWLEXVk2ixazTgmold2-lb4CRycdZajuIueuGqvCZp7iGyWLJlp10fW9cbDqrl_CxTzCFb6muTEOY_fhs1LmQbaotIjjebArBDsScmxdgz00GMp9PXzi5ZXqulBXiPOakzL71TJE1FQH9kvvcv0_LIFKdQIeugv1IpestEY_Szd6JBaToTJku37onAjRi8_5Ghk4Ac8A90FVfMmSP0imc9_1bJxGsHkVuiTzBnHhJ_W2xUurPAzkeAM2o0Nh7IfIVIlsp5kpRDeJIoRlXWGBs_5pnel0tVPOcaMf6tPOjTTVTCCiD3pcaXE_R2wGreS5lOIJi5sOlCGkaltn12BfGUUdbEIep0tV_zjoBNo5IpCCoz2yCyzFFPktIf18MNjebDaBFtrY9r-nLqLM2ZADyUg" width="728" height="90" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe><img src="https://ghent-gce-nl.bidswitch.net/imp/1.5607/BSWhttps_A_B_Baax-eu.amazon-adsystem.com_Be_Bor_B2fdf62ab27c1174e7ef53f260727f8be_Bimpb_Cb_RJBE-MQocgXuAXPNXFMBWa-sAAAGYMHTBHAMAAAeIAUEzcHhfdHhuX2JpZDEgICAzcHhfdHhuX2ltcDEgICCp4Rmc_Jw_R_I_WAUCTION__PRICE_AHMAC__SHA1_X_Jbi_RMTb-f4kSYx6w7eXbYW43PUSL2nyecSSaL.dQYM6qrrIVIduzQYinMMxOegEluAeK-xt9xy7N98VAW58w.tg8gSlq2u0WvYOrz9DhTsnnrdh.PfwrU6YxlcuKJv4xbwwS2TTGfXlzUAQbV8wbgqZnCXqbtsnmBg5f6PI0D6.QANzmV7MLzr0TO8mehrdmjLPhC2vszDSfl502liS9TyIVuAQjGz9HxUretLRsYad7FclGnbm6wJmhjcUX9kBRgzqj.ejB.NDDIMeqRIMM70vA39yJnvedTvQTeV6u6PTLYYmBeaHFBtJFkzcXX5cxXiC2l07PfoYT.r00lur0yhib3B6o6hKbGf.5nlQtiNkfeO15X4WLGkSxNFW1gWEYw6GIt1xohPndRsQzLxV00R2bkqY.4Ba7tNReo3x.m6w-I.IcPnQ5ReHx8fiScehACUcJGgccLg8tvep36pVskLH8FQBeY7tQIz3kcqH6OQkcKSm4rVPYJu18c2QNl7uee4.zTezwpfZAjRpHvRMpn7RWTlw2z-GHXYfU7-qsR-YiqKELURWjpqwc1dfbddCy0NKvQaenM2NVpylLS7kW3g8aJhYS1FQoGoTtd.V4fESivlvBiFSPbHI1QWS2MlJvYB6d6abY2fenDcahnVQi9A9Avrvg.g6AC9cqvBTao.UbOh3SHz-Z8fM2LbmbAxW3oWJyHAEhfScw3QFK36WgY4Af-Q____/4y7dLc_2xrzdFbHVb0iwRpoWJTDutLuAXjxFjBYcXh_zlmSSfXdyU0KIUzqHH9HmQgESsbJqc_iqUOWDjSCfCOctZWZltEo_eL0H7scMtmlWufgoap3PwPUjq7UvNi4M8bhafHd2D_ceqp-nECG_gRYyEgksn91gX0PJ00tHD6WTJy269o_yAPC0l09DVoW3PXV-8EtqwQ2AxrF_XV_lJnUZK5iP4D52w8KGcifo48AcrBJ6uUHDfBf4JrEFigmR5FosvqhRcQ4cAfQ7aazsqmj27AXxUe3a6qIi97Ni7u4yVJCwIbVCoxbfaYoGlncJMXignNxL3nnbgMJpwxB3dOdRu30y3PrzZj4MeU0JNuW-zdqJlW7mu7A0WAzk-5bAuqUqND-h_rrLinFS5bKyQ4LDDV-ijkj3afXQtTVrd1bzcDYSsi7HesWrcB_2s9mAvBHFn2QCrwcxfpLg3zojy1D5lovw2IR6VZs-ExAckS0an7RAfBZCy7ZorXT2pXSYpmQ4ogRh9vmoP9GNiGKrPWwQBvW2TG70Q7jhOo4Qk-IA5afqWDhguBuToNTh_VQS7QkgEReUg8nzDIL7z4r2hbxJlBypTTpf2qVD6gVh6jsehjwO0cjvZXFCMbJoRb8dZQoqyQu5tVAsb3M6J_xdyScTmyUK-6G-SG1WkE4XRJ-U7nLmxRkoaP_R4hJft-XassAxi8Zp9KelQ9HdCTx21-zdmGyMXXjhdlpPz2vWb2R1yocG3HajT2PUa_eG72hB22USeXMVIr-G-9YmyrUT-ZPlsjiTUW2HHbk6dUz_LBNIemjYiMhypzvITkiTrksRgzwhoSot6WMcKXEEeH-rFyf8eZqUXMyMCPbI0AL5729RclSpxtjjMw5xEGT68VzCpAGhe63R5zjot7fwN1cYusihZ3ELtyorvG-W_cYBgxVnEsRPWh1WY01jthoelxmVf5kwCgnB4pauPMagkrmt_CcrQEBof4B6dEER8RSv8dxs5_N6SH9QtUxrf0PU9lQB5S2RogrgP6tg9VeOGCJMj6O2v9xDg6pfZ1Z4P5Rg843O6pSqroQD6BnXIfik6w31b4ktDiZLN5qzm-tJRZuMzxF_YiX3oy7TVeeOFwQh-dEXtd0gMIzDgqqiDB8PUXX7Y_vh0S22wG6C7eSX3vFWTMLE0XghtRNvmWFVp9Kc7JyS8ewXFQULUE8_xk9OR6Tu2SwuKsUOiNTI5h0Do6OaQMukarEmZh2I5OTmHjfVQlVflO_eJvln4eio5XNZWL7CaBNkojaGc2u7AQv6zsPLdbqOBTgsWMx3d72SFtliBv1h0ZKlDgRAPqPkMrtBt-p1ItnS64xQn4hF4QZh8kDOTzsOsBHF891N3XxHcbmovsti_0fyaz9HVh1uHAthSMSoh5PbS3B6drYAIP9UgSgA_NkzQ3Tyl5iu2qIDO1DvGWrH4AyRzJeb24bnMmm00kPoOZFsMjEWvosv2pfTpSJNOhw5ry8Yl3q_2xHGjz5gkwWFTTQYzUunPzg56VZA4NTlPskhYS6FJ6zfr7a2gTTCevTkLNPANneQfaycoGUGOxYUdwJkGsRsllIsMCKk-7ZNHQQGvRkBbCyzEMp_2Y8jVpt3mu5NsTCT67NfGc__MB0SyS1vpscj6MF0F-R3eZta0OouMnUU2QfM7w3Lkz5uVVN8eFo6_1NVn3mmZN2h85-DYiqHKuS68ykle1dcBUQ2r4qd3qgV5VG21pJf2lYd6P0XyfyYkPDV3s_GtxwEunzOVlOkYCXn4JFp68e49_ZArI5rHAg2NmkXnLg6hiTB5CqpXWuh2Wf-QMz1SmnuQOo3zA-5LvEwwAqbZ4YsEtH000B3JbQLmcwkLyToYqJdINivQ67WVF-EnL0NvAjSt0aT6g6E54XgsHLAZJNaxegLUHJgoV7ructhXdIDB0S1JMJjC5-m4zZa33uE8sd3-Ial91iVS_qgiCnX7XXOgvS8pGl2qFK5df5uAuA_icsvdq3yo2DuNLQaNue3cUKENY1xbU5aCERd2XOBHmrZopZJueg5j2gm1RWu6YzdxG2Z4PfjjXa2V3rwmE5ZPr8ml9Hlh752euCnjWomZw7zUKR5FCR0VHQXYqQ/" alt=" " style="display:none"/><script src="https://pxdrop.lijit.com/1/d/t.dhj?dmn=tuttocampo.it&pn=%2F&ipaddr=101.56.115.101&pubid=appmonet&v0=260380&GDPR_v2=CQTxRQAQTxRQAA_AFAITBxFsAP_gAEPgAAAAJqtD_G_fbWFq8Tr3afpkeYgHx9hjasQhBgaJEWQFyDqS_JwShmAwJASApqICmRAAOzRBIQFkHBDQRVAgQIABpQDMYEAEgDAIJiAggFIRA0JICARPGYlDGAAY5Pp8MhUxmBst7JLs3MzAg4gHlTQpA2QhAICRAYQNAPlgQAKC8xAMVmxUuwlQ8ELoAGOOQBG_gGlpoB8uYkMpRB0V4JqtB_G_dbXFu8DhXYfpkOYgXx9gDasQhBAaJIWQFyDqS9IwSlmAyJACAIKIAGRAAIzRBIAEoEBhARFAgQIABJQDMAEAAgDAIIGAggDIRQEBAAABPCYlDGAAZ5Op-MBV5iQks5JLm3EyAAZgjtTApA2QBAIiQCYAFEOlgQAAA4jAcVkRC0glA8MLoAAKCABG_kGhholYO4sHJRhoRYAA.f_wAD_wAAAAA" async="true" defer="true" id="pxscrpt"></script>`
  }]
    
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 relative pb-24">
      {/* Toggle Button - Fixed position */}
      <button
        onClick={handleToggleAdsClick}
        className="fixed top-4 right-4 z-50 hover:bg-red-700 text-black px-4 py-2 rounded-lg font-bold shadow-lg transition-colors"
      >
        {showAds ? <CircleOff /> : <DollarSign />}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Ad-Free Experience</h2>
            <p className="text-center mb-6">For an ad-free experience, pay Corey $10</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleAccept}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content with conditional ad layout */}
      {showAds ? (
        <div className="transition-opacity duration-500">
          {/* Top Section with Banner and Side Ads */}
          <div className="w-full mb-6">
            {/* Top Banner with 300x250 ads on sides */}
            <div className="flex justify-center items-start gap-4 mb-4">
              {/* Left 300x250 Ad */}
              <div>
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="left" />
              </div>
              
              {/* Center Banner Ad */}
              <div className="flex-shrink-0">
                <AdBanner ads={sampleAds.banner} type="banner" position="top" />
              </div>
              
              {/* Right 300x250 Ad */}
              <div>
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="right" />
              </div>
            </div>
          </div>
          
          {/* 728x90 Leaderboard Ad below top banner */}
          <AdBanner ads={sampleAds.leaderboard} type="leaderboard" position="below-top" />
          
          {/* Main Content Area with Side Ads */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <AdBanner ads={sampleAds.sidebar} type="sidebar" position="left" />
              {/* Left bottom 300x250 ad */}
              <div className="mt-4">
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-left" />
              </div>
            </div>
            <div className="mx-4">
              <RedirectForm />
            </div>
            <div className="flex flex-col items-center">
            <AdBanner ads={sampleAds.sidebar} type="sidebar" position="right" />
              {/* Right bottom 300x250 ad */}
              <div className="mt-4">
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-right" />
              </div>
            </div>
          </div>
          
          {/* 728x90 Leaderboard Ad above bottom banner */}
          <AdBanner ads={sampleAds.leaderboard} type="leaderboard" position="above-bottom" />
          
          {/* Bottom Banner Ad with 300x250 ads on sides */}
          <div className="flex justify-center items-center gap-4">
            {/* Left 300x250 Ad for bottom banner */}
            <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-banner-left" />
            
            {/* Bottom Banner Ad */}
            <AdBanner ads={sampleAds.banner} type="banner" position="bottom" />
            
            {/* Right 300x250 Ad for bottom banner */}
            <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-banner-right" />
          </div>
          
          {/* Sticky Footer Ad */}
          <AdBanner ads={sampleAds.stickyFooter} type="sticky-footer" position="bottom" />
        </div>
      ) : (
        /* RedirectForm without ads when hidden */
        <RedirectForm />
      )}
    </main>
  );
}
