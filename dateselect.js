/**
  * 数组LunarDaysOfMonth存入农历1901年到2050年每年中的月天数信息
  * 农历每月只能是29或30天，一年用12(或13)个二进制位表示，从高到低，对应位为1表示30天，否则29天
  */
var LunarDaysOfMonth = new Array
(
	0x4ae0, 0xa570, 0x5268, 0xd260, 0xd950, 0x6aa8, 0x56a0, 0x9ad0, 0x4ae8, 0x4ae0,   // 1901-1910   
	0xa4d8, 0xa4d0, 0xd250, 0xd548, 0xb550, 0x56a0, 0x96d0, 0x95b0, 0x49b8, 0x49b0,   // 1920   
	0xa4b0, 0xb258, 0x6a50, 0x6d40, 0xada8, 0x2b60, 0x9570, 0x4978, 0x4970, 0x64b0,   // 1930   
	0xd4a0, 0xea50, 0x6d48, 0x5ad0, 0x2b60, 0x9370, 0x92e0, 0xc968, 0xc950, 0xd4a0,   // 1940   
	0xda50, 0xb550, 0x56a0, 0xaad8, 0x25d0, 0x92d0, 0xc958, 0xa950, 0xb4a8, 0x6ca0,   // 1950   
	0xb550, 0x55a8, 0x4da0, 0xa5b0, 0x52b8, 0x52b0, 0xa950, 0xe950, 0x6aa0, 0xad50,   // 1960   
	0xab50, 0x4b60, 0xa570, 0xa570, 0x5260, 0xe930, 0xd950, 0x5aa8, 0x56a0, 0x96d0,   // 1970   
	0x4ae8, 0x4ad0, 0xa4d0, 0xd268, 0xd250, 0xd528, 0xb540, 0xb6a0, 0x96d0, 0x95b0,   // 1980   
	0x49b0, 0xa4b8, 0xa4b0, 0xb258, 0x6a50, 0x6d40, 0xada0, 0xab60, 0x9370, 0x4978,   // 1990   
	0x4970, 0x64b0, 0x6a50, 0xea50, 0x6b28, 0x5ac0, 0xab60, 0x9368, 0x92e0, 0xc960,   // 2000 
    0xd4a8, 0xd4a0, 0xda50, 0x5aa8, 0x56a0, 0xaad8, 0x25d0, 0x92d0, 0xc958, 0xa950,	  // 2001-2010 
    0xb4a0, 0xb550, 0xb550, 0x55a8, 0x4ba0, 0xa5b0, 0x52b8, 0x52b0, 0xa930, 0x74a8,   // 2011-2020 
    0x6aa0, 0xad50, 0x4da8, 0x4b60, 0x9570, 0xa4e0, 0xd260, 0xe930, 0xd530, 0x5aa0,	  // 2021-2030 
    0x6b50, 0x96d0, 0x4ae8, 0x4ad0, 0xa4d0, 0xd258, 0xd250, 0xd520, 0xdaa0, 0xb5a0,	  // 2031-2040 
    0x56d0, 0x4ad8, 0x49b0, 0xa4b8, 0xa4b0, 0xaa50, 0xb528, 0x6d20, 0xada0, 0x55b0	  // 2041-2050 
); 
/**
  *	数组LunarLeapYear存放农历1901年到2050年闰月的月份，如没有则为0，从高到低，每字节存两年
  */
var LunarLeapYear = new Array
(
	0x00, 0x50, 0x04, 0x00, 0x20,   // 1901-1910   
	0x60, 0x05, 0x00, 0x20, 0x70,   // 1920   
	0x05, 0x00, 0x40, 0x02, 0x06,   // 1930   
	0x00, 0x50, 0x03, 0x07, 0x00,   // 1940   
	0x60, 0x04, 0x00, 0x20, 0x70,   // 1950   
	0x05, 0x00, 0x30, 0x80, 0x06,   // 1960   
	0x00, 0x40, 0x03, 0x07, 0x00,   // 1970   
	0x50, 0x04, 0x08, 0x00, 0x60,   // 1980   
	0x04, 0x0a, 0x00, 0x60, 0x05,   // 1990   
	0x00, 0x30, 0x80, 0x05, 0x00,   // 2000
    0x40, 0x02, 0x07, 0x00, 0x50,	// 2001-2010 
    0x04, 0x09, 0x00, 0x60, 0x04,	// 2011-2020 
    0x00, 0x20, 0x60, 0x05, 0x00,	// 2021-2030 
    0x30, 0xb0, 0x06, 0x00, 0x50,	// 2031-2040 
    0x02, 0x07, 0x00, 0x50, 0x03	// 2041-2050 
);

/**
  * 日期转换
  * 使用方法
  * var dc = new dateChange();
  * var a=dc.getSolarDate([2005,1,10]);	//农历转公历
  * var b=dc.getLunarDate([2005,1,10]); //公历转农历
  * @author	zhangshengguang
  */
function dateChange(){	
	/**
	  * 返回农历iLunarYear年的闰月月份，如没有则返回0 
	  */
	function GetLeapMonth(iLunarYear)
	{ 
		var Leap = LunarLeapYear[(iLunarYear - 1901) >> 1];
		return (((iLunarYear - 1901) & 1) == 0) ? (Leap >> 4) : (Leap & 0x0f);
	}
	/**
	  * 返回农历iLunarYer年iLunarMonth月的天数，结果是一个长整数
	  * 如果iLunarMonth不是闰月， 高字为0，低字为该月的天数
	  * 如果iLunarMonth是闰月， 高字为后一个月的天数，低字为前一个月的天数
	  */
	function LunarMonthDays(iLunarYear, iLunarMonth)
	{ 
		var High;
		var Low;
		var Bit;
	 
		High = 0;
		Low = 29;
		Bit = 16 - iLunarMonth;
		if ((iLunarMonth > GetLeapMonth(iLunarYear)) && (GetLeapMonth(iLunarYear) > 0))  Bit--;
		if ((LunarDaysOfMonth[iLunarYear - 1901] & (1 << Bit)) > 0)  Low++;
		if (iLunarMonth == GetLeapMonth(iLunarYear))
		{
			High = ((LunarDaysOfMonth[iLunarYear - 1901] & (1 << (Bit-1))) > 0) ?  30 : 29;
		}
		return Low + (High << 16);
	} 
	/**
	  * 返回公历iSolarYear年iSolarMonth月的天数，结果是一个长整数
	  */
	function SolarMonthDays(iSolarYear,iSolarMonth)
	{ 
		var MonthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
		var isl = isLeapYear(iSolarYear);
		if(isl) MonthDays[1] = 29;
		return MonthDays[iSolarMonth-1];
	}
	/**
	  * 返回农历iLunarYear年的总天数
	  */ 
	function LunarYearDays(iLunarYear)
	{ 
		var Days;
		var tmp;
	 
		Days = 0;
		for (var i=1; i <= 12; i++)
		{
			tmp = LunarMonthDays(iLunarYear, i);
			Days = Days + ((tmp >> 16) & 0xffff); //取高位 
			Days = Days + (tmp & 0xffff); //取低位 
		} 
		return Days;
	}
	/**
	  * 返回公历iSolarYear年的总天数
	  */
	function SolarYearDays(iSolarYear)
	{ 
		var isl = isLeapYear(iSolarYear);
		return isl?366:365;
	}
	/**
	  * 判断公历年是否是润年
	  */
	function isLeapYear(iSolarYear){
		var y = parseInt(iSolarYear);
		return ((y%100==0 && y%400==0) || (y%4==0&y%100!=0));
	}
	/**
	  * 将农历iLunarYear年格式化成天干地支记年法表示的字符串 
	  */
	function FormatLunarYear(iLunarYear)
	{ 
		var szText1 = new String("甲乙丙丁戊己庚辛壬癸");
		var szText2 = new String("子丑寅卯辰巳午未申酉戌亥");
		var strYear;  
		strYear = szText1.substr((iLunarYear - 4) % 10, 1);
		strYear = strYear + szText2.substr((iLunarYear - 4) % 12, 1); 
		return strYear + "年";
	}
	/**
	  * 将农历iLunarMonth月格式化成农历表示的字符串
	  */
	function FormatLunarMonth(iLunarMonth)
	{ 
		var szText = new String("正二三四五六七八九十");
		var strMonth;
	 
		if (iLunarMonth <= 10)
		{
			strMonth = szText.substr(iLunarMonth - 1, 1);
		}
		else if (iLunarMonth == 11) strMonth = "冬";
		else strMonth = "腊";
	 
		return strMonth + "月";
	}
	/**
	  * 将农历iLunarDay日格式化成农历表示的字符串
	  */
	function FormatLunarDay(iLunarDay)
	{ 
		var szText1 = new String("初十廿三");
		var szText2 = new String("一二三四五六七八九十");
		var strDay;
		if ((iLunarDay != 20) && (iLunarDay != 30))
		{
			strDay = szText1.substr((iLunarDay - 1) / 10, 1) + szText2.substr((iLunarDay - 1) % 10, 1);
		}
		else if (iLunarDay != 20)
		{
			strDay = szText1.substr(iLunarDay / 10, 1) + "十";
		}
		else
		{
			strDay = "二十";
		}
	  
		return strDay;
	} 
	/**
	  * 计算两个公历日期相差的天数
	  */
	function CaculateSolarSpanDays(start,end){
		var starty = start[0];
		var startm = start[1];
		var startd = start[2];	
		var endy = end[0];
		var endm = end[1];
		var endd = end[2];	
		var daynum = 0;
		
		//年份的天数
		for(var i=starty;i<endy;i++){
			daynum += SolarYearDays(i);
		}
		//月份的天数
		for(var i=1;i<endm;i++){
			daynum += SolarMonthDays(endy,i);
		}
		daynum += endd-startd;
		return daynum;
	}
	/**
	  * 计算两个农历日期相差的天数
	  * isleap--> end的月份是闰月还是非闰月
	  */
	function CaculateLunarSpanDays(start,end,isleap){
		var starty = start[0];
		var startm = start[1];
		var startd = start[2];	
		var endy = end[0];
		var endm = end[1];
		var endd = end[2];	
		var daynum = 0;
		
		//年份的天数
		for(var i=starty;i<endy;i++){
			daynum += LunarYearDays(i);
		}
		//月份的天数
		for(var i=1;i<endm;i++){
			var mdays = 0;
			var tmp = LunarMonthDays(endy, i);
			mdays += ((tmp >> 16) & 0xffff); //取高位 
			mdays += (tmp & 0xffff); //取低位 
			daynum += mdays;
			//w('lunar'+endy+'年'+i+'月的天数为'+ LunarMonthDays(endy,i));
		}
		//如果当前月是闰月,加上当前月的非闰月天数
		if(isleap){		
			var Low;
			var Bit;	 
			Low = 29;
			Bit = 16 - endm;
			if ((endm > GetLeapMonth(endy)) && (GetLeapMonth(endy) > 0))  Bit--;
			if ((LunarDaysOfMonth[endy - 1901] & (1 << Bit)) > 0)  Low++;
			daynum += Low;	
		}
		daynum += endd-startd;
		return daynum;
	}
	/**
	  * 将公历日期转换为农历日期，返回农历表示的字符串
	  */
	function GetLunarDateString(SolarDate)
	{
		var tmp;
		var iLunarYear;
		var iLunarMonth;
		var iLunarDay;
		var Leap = false;
		var MinMilli = 1000 * 60;
		var HrMilli = MinMilli * 60;
		var DyMilli = HrMilli * 24;
		
		/* 从1901年1月1日算起，给定的公历日期已经过去的天数
		   Date是从1970年1月1日作为起点的	*/
		var StartDate = [1901,1,1];
		var iSpanDays = CaculateSolarSpanDays(StartDate,SolarDate);	
		//w('公历'+StartDate+'至'+SolarDate+'的总天数：'+iSpanDays);
	 
		// 公历1901年2月19日为农历1901年正月初一，差49天
		if (iSpanDays <= 18)
		{
			iLunarYear = 1900;
			iLunarMonth = 11;
			iLunarDay = 11+iSpanDays;
		}
		else if (iSpanDays>18 && iSpanDays < 49)
		{
			iLunarYear = 1900;
			iLunarMonth = 12;
			iLunarDay = iSpanDays - 18;
		}
		else
		{
			// 从农历1901年正月初一算起 
			iSpanDays = iSpanDays - 49;
			iLunarYear = 1901;
			iLunarMonth = 1;
			iLunarDay = 1;
	  
			// 计算农历年 
			tmp = LunarYearDays(iLunarYear);
			while (iSpanDays >= tmp)
			{
				iSpanDays -= tmp;
				iLunarYear++;
				tmp = LunarYearDays(iLunarYear);
				//w(iLunarYear + '总天数' + tmp + '  减后剩余天数:' +iSpanDays);
			}
			//w('年--'+iLunarYear);
	 
			// 计算农历月 
			tmp = LunarMonthDays(iLunarYear, iLunarMonth) & 0xffff; //取低字
			while (iSpanDays >= tmp)
			{
				iSpanDays -= tmp;
				if (iLunarMonth == GetLeapMonth(iLunarYear))  // 该年该月闰月
				{
					tmp = LunarMonthDays(iLunarYear, iLunarMonth) >> 16; //取高字
					if (iSpanDays < tmp)
					{
						Leap = (tmp > 0) ? true : false;  // 闰月的后个月？
						break;
					}
					iSpanDays = iSpanDays - tmp;
				}
	  
				iLunarMonth++;
				tmp = LunarMonthDays(iLunarYear,iLunarMonth) & 0xffff; //取低字
			}
	  
			// 计算农历日 
			iLunarDay += iSpanDays;
		}
		return [iLunarYear,(Leap?iLunarMonth*10 : iLunarMonth),iLunarDay,FormatLunarYear(iLunarYear)+'('+iLunarYear+')',(Leap ? "闰" : "") + FormatLunarMonth(iLunarMonth),FormatLunarDay(iLunarDay),'fromSolarDay'+SolarDate];
	  	//return FormatLunarYear(iLunarYear) + (Leap ? "闰" : "") + FormatLunarMonth(iLunarMonth) + FormatLunarDay(iLunarDay);
	}
	/**
	  * 将农历日期转换为公历日期
	  */
	function GetSolarDateString(LunarDate)
	{
		var tmp;
		var iSolarYear;
		var iSolarMonth;
		var iSolarDay;
		var Leap = false;
		var MinMilli = 1000 * 60;
		var HrMilli = MinMilli * 60;
		var DyMilli = HrMilli * 24;

		//判断LunarDate的月份是否属于闰月, 例 4为非闰月 40为闰月.
		var monthIsLeap = false;
		if(LunarDate[1]>12){
			monthIsLeap=true;
			LunarDate[1] = LunarDate[1]/10; 
		}
		if(LunarDate[0]<1900){
			alert('超出计算范围0');
			return false;
		}

		// 从1900年冬月十一(公历1901年1月1日)算起，给定的农历日期已经过去的天数	
		// 公历1901年2月19日为农历1901年正月初一，差49天
		// 公历1901年1月1日为农历1900年11月11，差49天
		var StartDate = [1901,1,1];
		if(LunarDate[0]==1900){
			if(LunarDate[1]==11){
				var iSpanDays = LunarDate[2]-11;
			}else if(LunarDate[1]==12){
				var iSpanDays = LunarDate[2] + 18;
			}else{
				alert('超出计算范围');
				return false;
			}			
		}else{
			var iSpanDays = CaculateLunarSpanDays(StartDate,LunarDate,monthIsLeap) + 49;	
		}
		//w('1900年冬月十一 至 '+LunarDate+'的总天数:'+iSpanDays);	
	 
		// 从公历1901年1月1日算起 	
		iSolarYear = 1901;
		iSolarMonth = 1;
		iSolarDay = 1;
  
		// 计算公历年 
		tmp = SolarYearDays(iSolarYear);
		//w(iSolarYear+'年'+'的总天数:'+tmp);
		while (iSpanDays >= tmp)
		{
			iSpanDays -= tmp;
			iSolarYear++;
			tmp = SolarYearDays(iSolarYear);
			//w(iSolarYear+'年'+'的总天数:'+tmp);
		}
		//w('计算公历年后剩余天数:'+iSpanDays);
 
		// 计算公历月 
		tmp = SolarMonthDays(iSolarYear, iSolarMonth);
		//w(iSolarYear+'年'+iSolarMonth+'月'+'的天数:'+tmp);
		while (iSpanDays >= tmp)
		{
			iSpanDays -= tmp;
			iSolarMonth++;
			tmp = SolarMonthDays(iSolarYear,iSolarMonth) ;
			//w(iSolarYear+'年'+iSolarMonth+'月'+'的天数:'+tmp + ' 减后:'+iSpanDays);
		}
		//w('计算月后剩余天数:'+iSpanDays);
  
		// 计算公历日 
		iSolarDay += iSpanDays;
		
		return [iSolarYear,iSolarMonth,iSolarDay,iSolarYear+'年',iSolarMonth+'月',iSolarDay+'日','fromLunarDays'+LunarDate];
	}
	
	this.getSolarDate = GetSolarDateString;
	this.getLunarDate = GetLunarDateString;
	this.SolarYearDays = SolarYearDays;
	this.SolarMonthDays = SolarMonthDays;
	this.LunarYearDays = LunarYearDays;
	this.LunarMonthDays = LunarMonthDays;
	this.GetLeapMonth = GetLeapMonth;
	this.FormatLunarMonth = FormatLunarMonth;
	this.FormatLunarDay = FormatLunarDay;
	this.FormatLunarYear = FormatLunarYear;
}
function w(msg){document.write(msg+'<br>');}

//////////////////////////////////////////////////////////////////////////////////////

/**
  * 初始化日期选择器
  * inputid->实际显示的文本框id
  * showwhat->初始显示农历选择框还是公历选择框 0=公历,1=农历
  * @author	zhangshengguang
  */
function initDateSelect(inputid,curSolarDate,showwhat){
	var dc = new dateChange();
	var dateselect_hiddeninput = $('#dateselect_hiddeninput');
	
	if(showwhat==undefined) showwhat=0;

	//设定当前农历公历日期 
	if(curSolarDate == undefined) curSolarDate=[1902,1,1];
	curLunarDate = dc.getLunarDate(curSolarDate);

	document.write('<div id="dateselectdiv" style="position:absolute;background-color:#fff;display:none;border:solid 1px #0000ff;width:240px; padding:5px;">');

	//radio按钮
	document.write('公历:<input value="0" type="radio" name="datetype" checked id="solarRadio">');
	document.write('农历:<input value="1" type="radio" name="datetype" id="lunarRadio"><br>');
	
	//初始化公历
	var solarContainerStyle = showwhat==0? '' : 'display:none'; 
	document.write('<div id="solarContainer" style="'+solarContainerStyle+'">');
	var solarYearSelect = '<select id="solarYear" name="">';
	solarYearSelect += solarYearOptions(1902,2050,curSolarDate[0]);
	solarYearSelect += '</select> ';
	document.write(solarYearSelect);

	var solarMonthSelect = '<select id="solarMonth" name="">';
	solarMonthSelect += solarMonthOptions(1,12,curSolarDate[1]);
	solarMonthSelect += '</select> ';
	document.write(solarMonthSelect);

	var solarDaySelect = '<select id="solarDay" name="">';
	solarDaySelect += solarDayOptions(curSolarDate[0],curSolarDate[1],curSolarDate[2]);	
	solarDaySelect += '</select> ';
	document.write(solarDaySelect);
	document.write('</div>');

	//初始化农历
	var lunarContainerStyle = showwhat==1? '' : 'display:none'; 
	document.write('<div id="lunarContainer" style="'+lunarContainerStyle+'">');
	var lunarYearSelect = '<select id="lunarYear" name="">';
	lunarYearSelect += lunarYearOptions(1902,2050,curLunarDate[0]);
	lunarYearSelect += '</select> ';
	document.write(lunarYearSelect);

	var lunarMonthSelect = '<select id="lunarMonth" name="">';
	lunarMonthSelect += lunarMonthOptions(curLunarDate[0],curLunarDate[1],curLunarDate[2]);
	lunarMonthSelect += '</select> ';
	document.write(lunarMonthSelect);

	var lunarDaySelect = '<select id="lunarDay" name="">';
	lunarDaySelect += lunarDayOptions(curLunarDate[0],curLunarDate[1],curLunarDate[2]);	
	lunarDaySelect += '</select> ';
	document.write(lunarDaySelect);
	document.write('</div>');

	document.write('</div>');	
	
	//添加选择事件
	var solary = $('#solarYear');
	var solarm = $('#solarMonth');
	var solard = $('#solarDay');
	var lunary = $('#lunarYear');
	var lunarm = $('#lunarMonth');
	var lunard = $('#lunarDay');
	solary.change(function(){
		solard.html( solarDayOptions( solary.val(),solarm.val(), solard.val()) );
		solarChangeSetDate();
	});
	solarm.change(function(){
		solard.html( solarDayOptions( solary.val(),solarm.val(), solard.val()) );
		solarChangeSetDate();
	});
	solard.change(function(){
		solarChangeSetDate();
	});
	lunary.change(function(){		
		lunarm.html( lunarMonthOptions(lunary.val(),lunarm.val()) );
		lunard.html( lunarDayOptions(lunary.val(),lunarm.val(),lunard.val()) );
		lunarChangeSetDate();
	});
	lunarm.change(function(){			
		lunard.html( lunarDayOptions(lunary.val(),lunarm.val(),lunard.val()) );
		lunarChangeSetDate();
	});
	lunard.change(function(){
		lunarChangeSetDate();
	});
	//切换事件
	var solarRadio = $('#solarRadio'); 
	var lunarRadio = $('#lunarRadio');
	var solarContainer = $('#solarContainer');
	var lunarContainer = $('#lunarContainer');
	solarRadio.click(function(){
		solarContainer.show();
		lunarContainer.hide();
		
		var solarDate=dc.getSolarDate([lunary.val(),lunarm.val(),lunard.val()]); //农历转公历
		var iy = solarDate[0];
		var im = solarDate[1];
		var id = solarDate[2];

		var html = solarYearOptions(1902,2050,iy);
		solary.html(html);
		var html = solarMonthOptions(1,12,im);
		solarm.html(html);
		solard.html( solarDayOptions(iy,im,id) );
		
		solarChangeSetDate();
	});	
	lunarRadio.click(function(){
		solarContainer.hide();
		lunarContainer.show();
		
		var lunarDate=dc.getLunarDate([solary.val(),solarm.val(),solard.val()]); //公历转农历
		var iy = lunarDate[0];
		var im = lunarDate[1];
		var id = lunarDate[2];

		var html = lunarYearOptions(1901,2050,iy);
		lunary.html(html);
		var html = lunarMonthOptions(iy,im);
		lunarm.html(html);
		lunard.html( lunarDayOptions(iy,im,id) );

		lunarChangeSetDate();
	});
	if(showwhat==0){
		solarRadio.attr('checked',true);
	}else{
		lunarRadio.attr('checked',true);
	}
	
	//文本框的点击事件
	var isclick = false;
	$('#'+inputid).click(function(){
		if(!isclick){
			isclick = true;
			var left = $(this).offset().left ;
			var top = $(this).offset().top + $(this).height() + 5;
			$('#dateselectdiv').show().css({left:left,top:top});
		}else{
			isclick = false;
			$('#dateselectdiv').hide();
		}
	});

	if(showwhat == 0){
		solarChangeSetDate();
	}else{
		lunarChangeSetDate();
	}
	
	//重设文本框中的值
	function solarChangeSetDate(){
		$('#'+inputid).val(solary.val()+'年'+solarm.val() +'月'+ solard.val() + '日');
		dateselect_hiddeninput.val(solary.val()+'-'+solarm.val() +'-'+ solard.val());
	}
	function lunarChangeSetDate(){	
		var yy = dc.FormatLunarYear(lunary.val()) + '(' +lunary.val()+ ')';
		var mm = dc.FormatLunarMonth(lunarm.val());
		var dd = dc.FormatLunarDay(lunard.val());
		$('#'+inputid).val(yy +''+ mm +''+ dd);
		var solarDate=dc.getSolarDate([lunary.val(),lunarm.val(),lunard.val()]); //农历转公历
		dateselect_hiddeninput.val(solarDate[0]+'-'+solarDate[1]+'-'+solarDate[2]);
	}
	
	//生成年份option列表
	function solarYearOptions(from,to,curyear){
		var str = '';
		for( var i=from;i<=to;i++ ){
			var curstr = i==curyear ? 'selected' : '';
			str += '<option value="'+i+'" '+curstr+'>'+i+'年</option>';
		}
		return str;
	}
	function lunarYearOptions(from,to,curyear){
		var str = '';
		for( var i=from;i<=to;i++ ){
			var curstr = i==curyear ? 'selected' : '';
			str += '<option value="'+i+'" '+curstr+'>'+ dc.FormatLunarYear(i) +'('+i+')</option>';
		}
		return str;
	}
	//生成月份option列表
	function solarMonthOptions(from,to,month){
		var str = '';
		for( var i=from;i<=to;i++ ){
			var curstr = i==month?'selected':'';
			str += '<option value="'+i+'" '+curstr+'>'+i+'月</option>';
		}
		return str;
	}
	function lunarMonthOptions(year,month){
		var leapMonth = dc.GetLeapMonth(year);
		var str = '';
		var from = 1;
		var to = 12;
		
		var leap=false;
		if(month>12) {
			leap = true;
			month = month/10;
		}
		for( var i=from;i<=to;i++ ){			
			var notruncurstr = ( (month==i) && (leap==false) ) ? 'selected' : '';
			var runcurstr = ( (month==i) && (leap==true) ) ? 'selected' : '';			
			str += '<option value="'+i+'" '+notruncurstr+' >'+dc.FormatLunarMonth(i)+'</option>';			
			if(leapMonth>0 && i == leapMonth){
				str += '<option value="'+(i*10)+'" '+runcurstr+' >闰'+dc.FormatLunarMonth(i)+'</option>';
			}
		}
		return str;
	}
	//生成日option列表
	function solarDayOptions(year,month,day){
		var from = 1;
		var to = 0;
		var monthdaynum = dc.SolarMonthDays(year,month);
		to = monthdaynum;
		var str = '';
		for( var i=from;i<=to;i++ ){
			var curstr = i==day? 'selected' : '';
			str += '<option value="'+i+'" '+curstr+' >'+i+'日</option>';
		}
		return str;
	}
	function lunarDayOptions(year,month,day){
		var from=1;
		var to=0;
		var leap = false;
		if(month>12){
			month=month/10;
			leap = true;
			var monthdaynum = (dc.LunarMonthDays(year,month) >>16) & 0xffff;
		}else{
			var monthdaynum = dc.LunarMonthDays(year,month) & 0xffff;
		}	
		to = monthdaynum;
		var str = '';
		for( var i=from;i<=to;i++ ){
			var curstr = i==day? 'selected' : '';
			str += '<option value="'+i+'" '+curstr+' >'+ dc.FormatLunarDay(i) +'</option>';
		}
		return str;
	}
}
