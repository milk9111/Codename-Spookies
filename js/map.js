/** Represents different maps that you can getTestSap
*@author Brandon Blaschke
*/
class Map {

  /**
  * Get the test map
  * @return {String} String for test map
  */
  static getTestMap() {
    let test =
      "33333333333333333333333333333333333333333333333333333333333333333333333\n" +
      "3RQTQSRQRQRRRQRQUQRQRTRQRQTQSRGJKJIJOIJKIJNIJKNJINKJNIJOJKJKLJKOPJKIJK3\n" +
      "3RQQURSQTQRSQUQRQRQQRURSRQTQSRFJKJKIKJOPPJKJIJKJIKJLKJINKJKIOPNMJKPOJK3\n" +
      "3RQQRQQRSRRRRQQQRQRQQRQQRQRQQQENOILMLNJKKIJLMNLIJLMLMLKIJOPMLIJJLIOJKI3\n" +
      "3QQRRRUTQRUTQRUTTQSUTQRQRQRQSRHJKNIMJKLNMJKIOPNKJINMKOPNKJIONPJKIOPNLJ3\n" +
      "3RQRQSRUTQRQRQRQUTQRQRUQRQRQSRFJKJIJOIJKIJNIJKNJINKJNIJOJKJKLJKOPJKIJK3\n" +
      "3RQTQSRQRQRRRQRQUQRQRTRQQRQQQREJKJKIKJOPPJKJIJKJIKJLKJINKJKIOPNMJKPOJK3\n" +
      "3RQQURSQTQRSQUQRQRQQRURSRQTQSRFJKNIOJPJKNIKJIPOPNOJKINKJIONPJKNIJPNKJK3\n" +
      "3RQQRQQRSQRRRQQQRQRQQRQRQRQQQRGJIPOIJNJIPOIJOPOPIJIPOPOIJPIJNIPOPIJNMI3\n" +
      "3QQRRRUTQRUTQRUTTQSUTQRQRQRQSRFJJLMNILMLMIJIJLIJLMNLIJLMLMLKIJLMLIJJLI3\n" +
      "3RQQURSQTQRSQUQRQRQQRURQRQRQSREJKINKIJMJKNIJKIOPJKJINKJIJKIJKJINKJJOPJ3\n" +
      "3QQRRRUTQRUTQQRSTQSUTHRQQRGEFGGJKJKIKJOPPJKJIJKJIKJLKJINKJKnoPNMJKPOJK3\n" +
      "3QQRRRUTQRUTQRUTTQSUTFRQRQGJJLMNILMLMIJIJLIJLMNLIJLMLMLKIJL%qIJJLIJKIJ3\n" +
      "3QQRUTUQRQQRUUQQRSUTQEQQRQFJJLMNOILMLNJKKIJLMNLIJLMLMLKIJOPMLIJJLIOJKI3\n" +
      "3EFGEGFGEGFHGEFGEGFEGFTQQREEFHGEFFEGHEEFGHEJKJINKJINKJINOJKNIJKNIJKNIJ3\n" + //
      "3RQRQSRUTQRQRQRQUUTQRQUQRQRQSRUTQRQRQRQQTQHJKJIJOIJKIJNIJKNJINKJNIJOJK3\n" +
      "3RQTQSRQRQRRRQRQUQRQTRQRQRQQQRQQRQUTQRSURQGJIOPJINMJINMOPJIPKIJPIJJKOP3\n" +
      "3RQQRQQRSQRRRQQQRQQQRQQRQRQQQRQQRQUTQRQSTQFJIOJNIJNIJNOPJNIJNIJNIOOINJ3\n" +
      "3EFGHEFFGEFGHEFEEFGGHESQRQEEFHGEFHGEHFQUQREJIOPJINMJINMOPJIPKIJPIJJKOP3\n" + //
      "3QQRRRUTQRUTQRUTTSUTQFQQRQFLMLMIJIJLIEQSRQGJKNIOPJMNOPIJNMIOPJNMIOPOIJ3\n" +
      "3RQRQSRUTQRQRQURQTQRQGUQRQGJNMOPIJNMOFRQUTGJIOPJINMJINMOPJIPKIJPIJJKOP3\n" +
      "3RQTQSRQRQRRRQRUQRQRTHQRRQHEFHGLMLMIJGSUQRFJKIPONMJIOPIJIJNMJIOPIJKJIN3\n" +
      "3RQQURSQTQRSQURQRQQRUQSQQRQQQREJKOPINEQUTQEJIOPJINMJINMOPJIPKIJPIJJKOP3\n" +
      "3RQQRQQRSQRRRQQRQRQQRQQRQRQQQRFIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3QQRRRUTQRUTRUTTQSUTQRQQQRQQQREJJLMNILMLMIJIJLIJLMNLIJLMLMLKIJLMLIJJLI3\n" +
      "3RQTQSRQRQRRRQRQUQRQRTRQQRQQQREIJLMNOPIJIOPIJNMOPIJNMOIJNNOPMNIOPIJINJ3\n" +
      "3RQQURSQTQRSQUQRQRQQRURSRQTQSREIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQQRQQRSQRRRQQQRQRQQRQRQRQQQRFIJLMNOPIJIOPIJNMOPIJNMOIJNNOPMNIOPIJINJ3\n" +
      "3QQRRRUTQRUTQRUTTQSUTQRQRQRQSRGIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQQURSQTQRSQUQRQRQQRURQRQRQSRHIJOPJJOPIJLNMJIJIMNMNIJOPIJIJNMJNMJNMJI3\n" +
      "3QQRRRUTQRUTQQRSTQSUTQRQQRQQQREIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3QQRUTUQRQQRUUQQRSUTQRQQRQTQSRGIJLMNOPIJIOPIJNMOPIJNMOIJNNOPMNIOPIJIJN3\n" +
      "3QRQQQRQQRQUTQRQUTQURQTQQRQQQRFIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQRQSRUTQRQRQRQUUTQRQUQRQRQSRFIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQTQSRQRQRRRQRQUQRQTRQRQRQQQREJIPOIJNJIPOIJOPOPIJIPOPOIJPIJNIPOPIJNMI3\n" +
      "3RQQURSQTQRSQUQRQRQRURSQRQTQSRFIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQQRQQRSQRRRQQQRQQQRQQRQRQQQRGIJLMNOPIJIOPIJNMOPIJNMOIJNNOPMNIOPIJINM3\n" +
      "33333333333333333333333333333333333333333333333333333333333333333333333\n";
    return test;
  }

  /**
  * Get the test map for objects
  * @return {String} String for test map
  */
  static getTestMapO() {

    //Select a version to create, 3 random possibilties
    let version = Math.floor((Math.random() * 3));
    console.log("Version " + version);

    //These are versions of where things can go, plague doctor, screamer, ball of flesh, and exit
    let pd = 'M';
    let sc = 'Q';
    let bof = 'M';
    let ex = 'R';

    let pd1 = 'M';
    let sc1 = 'Q';
    let bof1 = 'M';
    let ex1 = 'R';

    let pd2 = 'M';
    let sc2 = 'Q';
    let bof2 = 'M';
    let ex2 = 'R';

    //Seleect the version
    switch(version) {
      case 0:
        pd = 'p';
        sc = '9';
        bof = '$';
        ex = 'r';
        break;
      case 1:
        pd1 = 'p';
        sc1 = '9';
        bof1 = '$';
        ex1 = 'r';
        break;
      case 2:
        pd2 = 'p';
        sc2 = '9';
        bof2 = '$';
        ex2 = 'r';
        break;
    }

    let test =
      "33333333333333333333333333333333333333333333333333333333333333333333333                          \n" +
      "3" + pd + "QTQSRQRQRRRQR" + pd2 + "UQRQRTRQRQTQSRGJKJIJOIJKIJNIJKNJINKJNIJOJKJKLJKOPJKIJK3\n" +
      "3RQQURSQTQRSQUQRQRQQRURSRQTQSRFJKJKIKJOPPJKJIJKJIKJLKJINKJKIOPNMJKPKJK3\n" +
      "3RQbRQQRSRRRRQQQRQRQQRQQRQRQQQENOILMLNJKKklLMNLIJLMLMLKIJOPMLIJJL" + ex + "OJKI3\n" +
      "3QQRRRUTQRRTQRaTTQSUTQRQRQRQSRHJKNIMJKLNMJKIOPNKJINMKOPNKJIONPJVIOPNLJ3\n" +
      "3RQRQSRUTQRQRQRRUTQRQRUQRQRQSRFJKJIJOIJKIJNIJKNJINKJNIJOJKJKLJKOPJKIJK3\n" +
      "3RQTQSRQRQRRRQRQUQVQRTRQQRQQQREJKJKIKJOPPJKJI" + sc + "KJIKJLKJINKJKIOPNMJKPOJK3\n" +
      "3RQQURSQTQRSQUQQRQRQQRURSRQTQSRFJKNIOJPJKNIKJIPOPNkJKINaJIONPJKNIJPNKJK3\n" +
      "3RQQRQQRSQRRRQQQRQRQQRQRQRQQQRGJIPOIJNJIcOIJOPOPfJIPOPOIJPIJNIPOPIJNMI3\n" +
      "3QQRRRUTQRUTQrUTTQSUTQRQRQRQSRFJJLMNILMLMIJIJLIJLMNLIJLMLMLKIJLMLIJJLI3\n" +
      "3RQQURSQTQRSQUQRQRQQRURQRQRQSREJKINKIJMJKNIJKIOPJKJINKJIJKIJKJINKJJOPJ3\n" +
      "3QQRRRUTQRUTQQRSTQSUTHRQQRGEFGGJKJKIKJOPPJKJIJKJIKJLKJbNKJKIOPNMJKPOJK3\n" +
      "3QQRRRUTQRRTQRUTTQSUTFRQRQGJJLMNILMLMIJgJLIJLMNLIJLMLMLKIJLMLIJJLIJKIJ3\n" +
      "3QQRUTUQRQQRUUQQRSUTQEQQRQFZLLMNOVLMLNJKKIJLMNLIJLMLMLKIJOPMLIJJLIOJKI3\n" +
      "3EFGEGFGEGFHGEFGEGFEGFTQQREEFHGEFFEGHEEFGHEJKJINKJINKJINOJKNIJKlIJKNIJ3\n" + //
      "3RQRQSRUTQRQRQRQUUTQRQUQRQRQSRUTQRQ" + bof1 + "QRQQTQHJKJIJOIJKIJNIJKNJINKJNIJOJK3\n" +
      "3RQTQdRQRQRRRQRQUQRQeRQRQRQQQRQQRQUTQ" + pd2 + "SURQGJIOPJINMJINMOPJIPKIJPIJJKOP3\n" +
      "3RQQXQQRSQRRRQQQRQQQRQQRQRQQQRQQRQUTQRQSTQFJIOJNIJNIJNOPJNIJNI" + bof + "JNIOOINJ3\n" +
      "3EFGHEFFGEFGHEFEEFGGHES" + sc1 + "RQEEFHGEFHGEHFQUQREJIOPJINMJINMOPJIPKIJPIJJKOP3\n" + //
      "3QQRRRUTQRUTQRUTTSUTQFQQRQFLMLMIJIJLIEdSRQGJKNOOPJMNOPIJNMIOPXdNMIOPOIJ3\n" +
      "3RQRQSRUTQRQRQURQTQRQGUQRQGJNMOPIJNMOFRQUTGJIOPJINMJINMOPJIPjIJPIJJKOP3\n" +
      "3RQTQSRQRQRRRQRUQRQRTHQRRQHEFHGLaXdMlJGSUQRFJKIPONMJIOPIJIJNMJIOPIJKJIN3\n" +
      "3RQQURSQTQRSQURQRQQRUQSQQRQQQREJKOPINEQUTQTJIOPJhNMJINMOPJIPKIJPIJJKOP3\n" +
      "3RQQRQcRSQRRRQQRQRQQRQQRQRQQQRFIOPJNMJI" + pd1 + "PKJIJNMJIOPJ" + sc2 + "NMJINMOPJIPKIJPIJ3\n" +
      "3QQRRRUTQRUTRUT" + bof2 + "QSUTQRQQQRQQQREJJLMNILMLMIJIJkIJLMNLIJLMLMLKIJLMLIJJLI3\n" +
      "3RQTQSRQRQRRRQRQUQRQRTRQQRXwQQREIJLMNOPIJIO" + pd + "IJNMOPZJNMOIJNNOPMNIOPIJINJ3\n" +
      "3RQQURSQTQRSQUQRQRQQRURSRQTQSREIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKI" + ex2 + "PIJ3\n" +
      "3RQQRQQRSQRRYQQQRQRQQRQRQRQQQRFIJLMNOPI" + bof + "IOPIJNMOPIJNMOIJNNOPMNIOPIJINJ3\n" +
      "3QQRRRUTQRUTQRUTTQSUTQRQRQRQSRGIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQQURSQTQRSQUQRQRQQRURQRQRQSRHIJOPJJOPIJLNMJIJIMNMNIJOPIJIJNMJNMJNMJI3\n" +
      "3QQRRRUTQRUTQQRSTQSUTQRQQRQQQREIOPJmMJIOPKJYJNMJ" + bof + "OPJmNMJINMOPJIPKIJPIJ3\n" +
      "3QQRUTUQRQQRUUQQRSUTQRQQRQTQSRGIJLMNOPIJIOZIJNMOPIJNMOIJNNOPMNIaPIJIJN3\n" +
      "3QRQQQRQQRQUTQRQUTdUR" + pd1 + "TQQRQQQRFIOPJNMJIOPKJIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQRQSRUTQRQRQRQUUTQRQUQRQRQSRFIOPJNMJIOPKiIJNMJIOPJINMJINMOPJIPKIJPIJ3\n" +
      "3RQTQQRQRQRRR" + ex1 + "RQUQRQTRQRQRQQQREJIPOIJNJIXkIJOPOPIJIPOPOIJPIJNIPOPIjNMI3\n" +
      "3RQQURSQTQRSQUQRQRQRURSQRQTQSRFIOOJNMJIOPKJIJNMJIOPJINMJINMOPJ9PKIJPIJ3\n" +
      "3RQQQQQRSQRRRQQQRQQQRQQRQRQQQRGIJLMNOPIJIOPIJNMOPIJNMOIJNNOPMNIOPIJINM3\n" +
      "33333333333333333333333333333333333333333333333333333333333333333333333\n";

      return test;
  }

  static getMap2() {
    let map2 =
    //108 X 17
    "xstyxstxytsxytsxytsxytsxytsxytsxtxytsxytsttxytsxytsxyxyxtysxytsxyxtysxtystxystxytsxytsxytsxytsxytsxytsxytsxystsxytsxytsytxtststysxysxttxtsystyxystyxssytxsysyxtsxtysx\n" +
    "sADBCsABDCBADCBABDCABDCBABsBCABBDCBsBDBCABDACBABDCtADBCBADCBADBDBCDBABADBABADBCDBADBCABADCBADBADBCDByBDCBDACADBCBADCsADBDBCDBABADBABADBCDBADBCABADCBADBADBCDBABDCBDAs\n" +
    "sCDBAyACADBCDBDCBADBCDBADBsCDABDCBAsCBADCBACDBADBDsABDACBADCBADBCADCBADCBADCBACDDBADCBADCBADCBADCBADtBADCBADDABCDABCtABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCs\n" +
    "yDCDAsDBDCAABCDABCDABCDABCsABCDBADBsADBACBDABCADCBsDCBACDBADCBACDBADCBADCBACADBBCDABCDABDCABDCABDCBAsCBADCBABADABABDsCDBACDBABADBCABCBABDBCABDCBADCBADBCABDCABDCBADCs\n" +
    "sBDDAsDDAsxtysxtysxtsxDBADsCCDACDACsABCDABCDABCDABsDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDtBCDABCDAsxtysxtxsxytssxBADBCABCBDBACBDBACBDABDCBABDBABDBCABABDDs\n" +
    "sCBACxCBAyBBDCBABDCABsCBABsBCABBDCBsBDBCABDACBABDCyADBCBADCBADBDBCsxtysxtxBADBCDBADBCABADCBADBADBCDBsBDCBDACDABCDABCDABCDABCDABCDABCDABCDABCDABCDsxtysxtysxtxtsyxtsxs\n" +
    "tDCDAsDBDsCBDADCBDCBDsCBACsABDACBADsCBADCBACDBADBDsABDACBADCBADBCAtCBADBBADCBACDDBADCBADCBADCBADCBADsBADCBADABDCBADBCABDCABCBCBABDCBAABDCABADBADBADCBDBCDABACBDADCBAs\n" +
    "sCADAsABCtBnoDABCstyxyABCDsssssDABCDABCDABCDABCDABsDABCDABCDABCDABsDABCAABCDABCDABCDABCDABCDABCDABCDtBCDABCDCBADABADCBACDDBADCBADCBADCBADCBADCBADCBADABDCABCABDCBADCs\n" +
    "sBCBAtDCBsD%qABDCyBDCADBABDBCABBDCBABDBCABDACBABDCsADBCBADCBADBDBCtBABACBABADBCDBADBCABADCBADBADBCDByBDCBDACADBCBADCBADBDBCtBABADBABADBCDBADBCABADCBADBADBCDBABDCBDAs\n" +
    "sBADAsCDBxDBDCBADxCDBAADDBCCDABDCBADCBADCBACDBADBDxABDACBADCBADBCAsCBADABADCBACDDBADCBADCBADCBADCBADsBADCBADACBsBDBCABDCBADsCABCBDBAsBDBACBDABDCBAABCDABCDABCDABCDABs\n" +
    "ssxtyxCCAstxyxsstBDACBABCBDBCABBADBCADBACBDABCADCBsDCBACDBADCBACDBxDCBADCBACADBBCDABCDABDCABDCABDCBAtCBADCBAABCtABCDABCDABCyABABDABCtDABDABABDCBADBACDBABDCBABDCABABs\n" +
    "sDABADABCDABCDABsABDCAsxtysxtxtsxystABCDABCDABCDABsDABCDABCDABCDABsDABCAABCDABCDABCDABCDABCDABCDABCDsBCDABCDDABsDABCDABCDABsDABCDABCsABCDABCDABCDABCDABCDABCDABCDABCs\n" +
    "yBCBABDCBADCBABDxABDCBABCBDBCABBDCBABDBCABDACBABDCsADBCBADCBADBDBCxBABACBABADBCDBADBCABADCBADBADBCDBtBDCBDACDABxBDBCDBACDBAxADBCABCBxBDBCABDCBADCsxtysxytsxtysxtxtsxs\n" +
    "sDCBCDBADCCDBADBsCDABDCBCADDBADBCCDABDCBADCBADCBACDBADBDCABDACBADCsADBCBDCBADCBADCBACDDBADCBADCBADCBsxtysxtxtsyxtsyxtsxytsxtADBCABCBsBDBCABDCBADCBADBCABDCABDCBADCBAs\n" +
    "sDABCDBDACBADCABsCDACBABCDABACDBADBCADBACBDABCADCBADCBACDBADCBACDBsDCBAACBACADBBCDABCDABDCABDCABDCBABCBADCBACBADABADCBACDDBADCBADCBADCBADCBADCBADCBADABDBCADBCABDCABs\n" +
    "xxtyxsCDAstyxstyxACDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDAByDABCDABCDABCDABCDABCDABCDABCDABCDDBCDABCDADBCDABCDBADCBADCBCBCCBDBCADBABABDCBDCBABDCBDCBDABDCBCDAs\n" +
    "sCADACDBDACBDADCsDCBDACBADCBACDBADBCADBACBDABCADCBADCBACDBADCBACDBsDCBABCBACADBBCDABCDABDCABDCABDCBABCBADCBADABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCs\n" +
    "sBCBCBABDCBADCBAstyxtysxystxsxytssxABDBCAsxtysxytsxtystsyxtsyxtsxysxstyxBABADxstyxtysxytsxytxytsytxysABDCBABDAsxtysxtysxtxystDBCABCBABDBCABDCBADCssxtysxtxtsysxtxystx\n" +
    "xDDBADACADBCDBDCBADBCDBADBCCDABDCBADCBADCBACDBADBDCABDACBADCBADBCADCBADCBADCBACDDBADCBADCBADCBADCBADCBADCBADCBADABADCBACDDBAsCBADCBADCBADCBADCBADCBADABCDABCBADCBADCs\n" +
    "sCADACDBDACBDADCBDCBDACBADCBACDBADBCADBACBDABCADCBADCBACDBADCBACDBADCBADCBACADBBCDABCDABDCABDCABDCBADCBADCBABADABADCBACDDBADsBADCBADCBADCBADCBADCBADCABCDBADCBADCBDCs\n" +
    "yBCDAADDABCAABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDDABCDABCDABCDABCsABCDABCDABCDABCDABCDABCDABCDABCDABCDABCs\n" +
    "xstyxstxytsxytsxytsxytsxytsxytsxtxytsxytsttxytsxytsxyxyxtysxytsxyxtysxtystxystxytsxytsxytsxytsxytsxytsxytsxytsxytsxytsytxtststysxysxttxtsystyxystyxssytxsysyxtsxtysxs\n";

    return map2;
  }

  static getMap2O() {

    //Select a version to create, 3 random possibilties
    let version = Math.floor((Math.random() * 3));;
    console.log("Version " + version);

    //These are versions of where things can go, plague doctor, screamer, and exit
    let pd = 'M';
    let sc = 'Q';
    let ex = 'R';

    let pd1 = 'M';
    let sc1 = 'Q';
    let ex1 = 'R';

    let pd2 = 'M';
    let sc2 = 'Q';
    let ex2 = 'R';

    //Seleect the version
    switch(version) {
      case 0:
        pd = 'p';
        sc = '9';
        ex = 'r';
        break;
      case 1:
        pd1 = 'p';
        sc1 = '9';
        ex1 = 'r';
        break;
      case 2:
        pd2 = 'p';
        sc2 = '9';
        ex2 = 'r';
        break;
    }

    let map2 =
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss                                                                       \n" +
    "sADBCsABDCBADCBABDCABDCBABsBCABBDCYsBDBCABDACBABDCsADBCBADCBADBDBCDBABADBABADBCDBADBCABADCBADBADBCDBsBDCBDACADBCBAD" + ex + "sADBDBCDBABADBABADBCDBADBCABADCBADBADBCDBAcDCBDAs\n" +
    "sCDBAsACADBCDBDCBADBCDBADBsCDdBDCBAsCBADCBACDBADBDsABDACBADCBADBCADCBADCBA" + pd2 + "CBACDDBADCBADCBADCBADCBADsBADCBADDABCDABCsABCDABCDABCDABCDAB" + sc2 + "DlBCDABCDABCDaBCDABCDABCD" + ex2 + "BCs\n" +
    "sDCDAsDBDCAABCDABCDABCDABCsABCDBADBsADBACBDABCADCBsDCBACDBAzCBACDBADCBADCBACADBBCDABCDABDCABDCABDCBAsCBADCBABADABABDsCDBXCDBABADBCABCBABDBCABDCBADCBADBCABDCABDCBADCs\n" +
    "sBDDAsDDAsssssssssssssDBADsCCDACDACsABCDA" + pd + "CDmBCDABsDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDsBCDABCDAsssssssssssssssBADBCABCBDBACBDBACBDABDCBAdDBABzBCABABDDs\n" +
    "sCBACsCBAsBBmCBABDCABsCBABsBCABBDCBsBDBCABDACBABDCsADBCBADCBADBDBCssssssssBADBCDBADBCABADCBADBADBCDBsBDCBDACDABCDABCDABCDABCDABCDABCDABCDABCDABCDssssssssssssssssssss\n" +
    "sDCDAsDBDsCBabDCBDCBDsCBACsABDACBAAsCBADCBACDBADBDsABDACBADCBADBCAsCBADBBADCBACDDBADCBADC" + pd1 + "ADCBADCBADsBADCBADABDCBAcBCABDCABCBCBABDCBAABDCABADBADBADCBDBCDABACBDADCBAs\n" +
    "sCADAsABCsBBCDABCsssssABCDsssssDABCDABCDABCDABCDABsDABCDABCDABCDABsDABCAABCDABCDABCDABCDABCDABCDABCDsBCDABCDCBADABADCBACD" + pd2 + "BADCBADCB" + sc1 + "DCBADCBADCBADCBADABDCABCAaDCBADCs\n" +
    "sBCBAsDCBsDCBABDCsBDCADBABDBCABBDCBABDB" + sc1 + "ABDACBABDCsADBCBADCBADBDBCsBABACBABADBCDBADBCABADCBADBADBCDBsBDCBDACADBCBADCBADBDBCsBABADBABADBCDBADBCABADCBADBADBCDBABDCB" + sc + "As\n" +
    "sBADAsCDBsDBDCBADsCDBAADDBCCD" + pd2 + "ABDCBADCBADCBACDlADBDsABDACBADCBADBCAsCBADABADCBACDDBADCBADCBADCBADCBADsBAaCBADACBsBDBCABDCBADsCABCBDBAsBDBACBDABDCBAABCDABCDABCDABCDABs\n" +
    "ssssssCCAstxysuxxBDACBABCBDBAABBADBCADBACBDABCADCBsDCBACDBADCBACDBsDCBADCBA" + pd + "ADBBCDABCDABDCABDCABDCBAsCBADCBAABCsABCDABCDABCsABABDABCsDABDABABDCBADBACDBABDCcABDCABABs\n" +
    "sDABADABCDABCDABsABDCAssssssssssssssABCDABCDABCDABsDABCDABCDABCDABsDABCAABCDABCDABCDABCDABCDABCDABCDsBCDABCDDABsDABCDABCDABsDABCDABCsABCDABCDABCDABCDABCDABCDABCDABCs\n" +
    "sBZBArDCBAaCBABDsABDCBABCBDBCABBDCBABDBCABDACBABDCsADBCBADC" + pd + "ADBDBCsBABACBABADBCDBADBCAaADCBADBADBCDBsBDCzDACDABsaDBCDBACDBAsADBCABlBsBDBCABDCBADCssssssssssssssssssss\n" +
    "sDCBCDBADCCDBADBsCDABDCBCADDBbcBCCDABDCBADCBADCBACDBADBDCABDACBADCsADBCBDCBADCBADCBACDDBADCBADCBADCBssssssssssssssssssssssssADBCABCBsBDBCABDCBADCBADBCABDCABDCBADCBAs\n" +
    "sDABCDBDACBADCABsCDACBABCDA" + pd1 + "ACDBADBCADBACBDABCADCBADCBACDBADCBACDBsDCBAA" + pd2 + "BACADBBCDABCDABDCABDCABDCBABCBADCBACBADABADCBACDDBADCBADCBADCBADCBADCBADCBADABDBbADBCABDCABs\n" +
    "ssssssCDAssssssssACDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABsDABCDABCDABCDABCDABCDABCDABCDABC" + pd + "DBCDABCDADBCDABCDBADCBADCBCBCCB" + sc1 + "BCADBkBABDCBDCBABDCBD" + pd + "CBDABDCBCDAs\n" +
    "sCADACDBDACBDADCsDCBkACBADCBACDBADBCADBACBDABCADCBADCBACDBADCBACDBsDCBABCBACADBBCDABCDABDCYBDCABDCBABCBADCBADABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDACCs\n" +
    "sBCBCBABDCBADCBAsssssssssssssssssssABDBCAsssssssssssssssssssssssssssssssBAdADssssssssssssssssssssssssABDCBABDAsssssssssssssssDBCAkCBABDBaABDCBADCssssssssssssssssssss\n" +
    "sDDBADACADBCDBDCBADBCDBADBCCDABDCBADCBADCBACDBADBDCABDACBADCBADBCADCBADCBADCBACDDBADCBADCBADCBADCBADCBADCBADCBADABADCBACDDBAsCBADCBADCBADCBADCBADCBADABCDABCBADCBADCs\n" +
    "sCAaAC" + pd2 + "BDACBDADCBDCB" + sc + "ACBADCBACDBADBCA" + pd1 + "dACBDABCADCBADCBACDBADCBACDBADCBADCBACADBBCDABCDABDCABDCABDCBADlBADCBABADAB" + sc2 + "ADCBA" + sc + "CDDBADsBADCBADCBADCBADCBADCBADCABCDBADaBA" + ex1 + "CBDCs\n" +
    "sBCDAADDABCAABCDABCDABCDABCDABCeABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDDABCDABCDABCDAXCsABCDbBCBABCDkBCDmBCDABCDABCDABCDABCDACCs\n" +
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss\n";
    return map2;
  }

  static getMap3() {

    let map3 =
    "4567848475768475647586746545867484574845768457458                                                                                                                                                            \n" +
    "!!#@#!#!@#!@#@!#!@#!@#@@#!@@@#!@#!#!!!!@##@#!@#!@\n" +
    "!56784847576847564758674654586748457484576845745@#!@#!@#\n" +
    "!5658787584874587458687456784587458745678458787456768456!@#@!#!@#!                                                     !@#@#!@#@@@!#!#!@#!@#!@#!#@!@!#!##!#@#!#!#@!#!#!#\n" +
    "!56587875848745874586874567845874587556784587874456787564567567568@#!!@#@#!@#                                          #45686768456485675647678456756745684567456845756!\n" +
    "!5678484757684756475867465458674845748457684574556785566567845678645658547567!@#@#!@@#                                 !75456744545678567456845456756845674567456874568!         !!!!!\n" +
    "!5658787584874587458687456784587458765678458787456756856567658456845674845675456745684@!#!@#!                          @45684578745568457456546456758476567456845687456!         !856!\n" +
    "!!#@#!#!@#!@#@!#!@#!@#@@#!@@@#!@#!#!!78456784567567568564567855645456758546744567456854568467!@#@!#!@#!@               !457456854@!#!@#@!#@#@#!#!@#!@#@@!#!#!5467685745!@#@!#!@#!@857@!#@!#!@#!!@#\n" +
    "!5645654645645645645645645645645645656565645645675675686456785674645674568654456754686456786456745645768!@#!@#!@#!@##!!4567846865@                          !4568745874458457645685475687457858745\n" +
    "!56587875848745874586874567845874587456784587874567865784567856785456758546754567565464567854456745456784565674567564784566784568!      !@#!@#@!#!#@!!!!@#@!#4568745684456874568745745684587684576\n" +
    "!56587875848745874586874567845874587456784587874567686575675668567456785647684567567454567845456784456785674568456785745685685677#      !645786474657545764576456845745845687456876857564845875487\n" +
    "!56784847576847564758674654586748457484576845745567568674567865765456785647654567556744567486456785456784567568546745665678456784!      !745867645864758647584456874568545684575486745687445867587\n" +
    "!56587875848745874586874567845874587456784587874567658864567756856456785676574567565464567584456758456744567854675684664567856785@      !@#!@#@!#!#@!!!!@#@!#5468745688456857458457564854678457874\n" +
    "!@#!@!@#@!@#5745678567584!@@@#!@#!#!!4845678456756786756657586745645675685675456756464456785445678445678!@#!@#!@#!@##!@4567567487!                          !4585674585456845674545685467845687485\n" +
    "!564565464564564564564564!no%qno%qno!65656456456556785675674566756456758567764567564644565854456745!@##!               !456785678@!#!@#@!#@#@#!#!@#!@#@@!#!#!8457456845!@#!@#@!@@!576!@#@!#@!#!@#@\n" +
    "!565878758487458745868745!o%qno%qnqo!56784587874565758565467656786456745685644567564854567564!@#@#!                    #45678456744567567568567548547458745874568546754@         !578!\n" +
    "!567848475768475647586746!@@@#!@#!#!!845768457458567568556765468674567586756745674845!@#@#!@@                          !45675678445676586456745684567845674584568768456!         @!#!@\n" +
    "!5658787584874587458687456784587458745678458787455678567567568567545675678657!@#@!##!                                  @45678658645675467546745687458456784567854687458@\n" +
    "!54564665454645645644567567678567845678456784567856765785467568657!@#@!#@!#!!                                          !@#@#!@#@@@!#!#!@#!@#!@#!#@!@!#!##!#@#!#!#@!#!#!#\n" +
    "!5645654645645645645645645645745645656565645645655678567!@#@#!#@!@\n" +
    "@#!@#@!#!@#!7458745868745!7848745874!767845878745!@#!@#!\n" +
    "!5678484757!8475647586746!4586748457!845768457458!\n" +
    "!5658787584!7458745868745!7845874587!567845878745!\n" +
    "!!#@#!#!@#!@#@!#!@#!@#@@#!@@@#!@#!#!!!!@##@#!@#!@!\n";
    return map3;
  }

  static getMap3O() {

    //Select a version to create, 3 random possibilties
    let version = Math.floor((Math.random() * 3));;
    console.log("Version " + version);

    //These are versions of where things can go, plague doctor, screamer, and exit
    let pd = 'M';
    let sc = 'Q';
    let ex = 'R';
    let bof = 'Q';

    let pd1 = 'M';
    let sc1 = 'Q';
    let ex1 = 'R';
    let bof1 = 'Q';

    let pd2 = 'M';
    let sc2 = 'Q';
    let ex2 = 'R';
    let bof2 = 'Q';

    //Seleect the version
    switch(version) {
      case 0:
        pd = 'p';
        sc = '9';
        ex = 'r';
        bof = '$';
        break;
      case 1:
        pd1 = 'p';
        sc1 = '9';
        ex1 = 'r';
        bof1 = '$';
        break;
      case 2:
        pd2 = 'p';
        sc2 = '9';
        ex2 = 'r';
        bof2 = '$';
        break;
    }

    let map3 =
    "4567848475768475647586746545867484574845768457458                                                                                                                                                                                             \n" +
    "!!#@#!#!@#!@#@!#!@#!@#@@#!@@@#!@#!#!!!!@##@#!@#!@\n" +
    "@567848475767847564758674654586748457484576845745!@#!@#!@#\n" +
    "!5658787584874587458687456784587458745678458787456768456!#@#!@@#@!                                                     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" +
    "#56587878487458745868745678458745875" + pd1 + "6784587874456787564567567568!@!#!@!!@!#                                          !456867684a6485675647b78456756745684567456845756!\n" +
    "!56784847576a475647586746d4586748457484576845745567855"+ bof + "s6567845678645658547" + bof2 + "67!!!!!!!!!                                 !75456744545k78a6745684p4567569456745674568m4568!         !!!!!\n" +
    "@565878X58487458745868745678458745876567845878745675685656765k456845674845675456745684!!!!!!!                          !4568c5787455684574565464567c8476567456d45687456!         !846!\n" +
    "!#!@!!@#!#!@!!@!!#!!!!@!!!@#!#!@!!#!@784567845675675685645678556454567585467Z456745685456V467!!!!!!!!!!!               !457456854!!!!!!!!!!!!!!!!!!!!!!!!!!!!54676857l5!!!!!!!!!!!8$7!!!!!!!!!!!!!\n" +
    "!56456546456456456456456456456456456565656456456756756b6456785674645674568654456754c864567864567b5645768!!!!!!!!!!!!!!!456b846865!                          !4e68745874458457645a85475687457858745\n" +
    "@565878758487458745868745p7845874587456784587874567865784567856785456758546754567565464567a5445674545678456" + sc2 + "5674567564784566784568!      !!!!!!!!!!!!!!!!!!!!!4568745684456874568c4574568458768457" + pd + "\n" +
    "!565878l58487458745868745678458745874k678458787z56768657567566" + pd2 + "56745678564768456756745456a8454" + pd + "67844567856746845678574568568567X!      !44Y786" + bof2 + "74657545764576k5684574584568745687685756484587" + sc +"48r7\n" +
    "#56784847576847564k58674654586748457484576845745567568674567865765456785647654567556744567486456785456784" + sc1 + "56756854a745665Z78456784!      !7X586764586475864758445687456854568457548674568744586758" + pd1 + "\n" +
    "!56587875848745874586874567845874587456784587874Z6765886456775685645678567657456756d4645675844567584567445685e675684664567856785!      !!!!!!!!!!!!!!!!!!!!!546874568b456857458457564854678457874\n" +
    "!#!@!#!!@!!#!456758456746!@!@!!#!@!#!48456784567567867a665758674564567568e675456756464456785445678445678!!!!!!!!!!!!!!!4567567487!                          !45856745l545d845674a45685467845687485\n" +
    "!5645654k4564564564564564!no%qno%qno@656564564565567856756745m675645675856776456756464456585Z45l745!!!!!               !456785678!!!!!!!!!!!!!!!!!!!!!!!!!!!!8457456845!!!!!!!!!!!5$6!!!!!!!!!!!!!!\n" +
    "!565878758487458745868745!o%qno%qnqo!56784587874565758565467656786456745685644567564854567564!!!!!!                    !4567d45k744567567568a67548547458745874568546754!         !548!\n" +
    "@56784Z475768475647586746!#!#!@!#!!!#8457684l7458567568556765468674567586756745674845!!!!!!!!                          !45675678445676c86456b45p84567845974584568768456!         !!!!!\n" +
    "!565878758487458745868745678" + pd + "58745874567845878745" + bof1 + "678567567568567545675678657!!!!!!!!                                  !45678658645675467546745687458456784567854687458!\n" +
    "!5456466a45b645645644567567678567845678456784567856765785467568657!!!!!!!!!!!                                          !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" +
    "!56456546V5645645645645645645745645656565645645Y55678567!!!!!!!!!!\n" +
    "#!@!!#!@!!#!745c745868745!7848745874!767845878745!!!!!!!\n" +
    "!5678484757!8475647586746!4586748457!845768457458!\n" +
    "!5658787584!7458745868745!7845874587!567845878745!\n" +
    "!@#!#@!@#!@#!@##@#!#@#@!#@!#@!!@#@!#@!@#!#@!#@!#@@\n";
    return map3;
  }

  static getSimpleMap() {
    return '3'
  }
}
