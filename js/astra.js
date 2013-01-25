/*
	Astra Experimental Project
	Produced for the consideration of the GIGA group at
		the University of Windosr.
	

   Copyright 2013 Jeffrey Drake

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.onload = function() 
{
	Crafty.init(640, 480);
	
	Crafty.scene("loading", function()
	{
		Crafty.load(["assets/image1.png"], function() 
		{
			Crafty.scene("main");
		});

		
		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({w: 100, h:20, x: 150, y: 120 })
			.text("Loading")
			.css({"text-align": "center"});
	});
	
	Crafty.scene("main", function() 
	{
//		Crafty.background("background: url(assets/image1.png)");
//		generateWorld();
		var ent = Crafty.e("2D, DOM, Image").attr({x: 0, y: 0})
			.image("assets/image1.png");
			
		var title = Crafty.e("2D, DOM, Text, Mouse")
			.attr({w: 175, h: 20, x: 100, y: 20})
			.text("Map Editor")
			.css({"text-align": "center",
			      "font-size": "20pt",
			      "z-index": "1"})
			.bind("EnterFrame", function(data)
			{
				// note getFPS is only the target frame rate
				var time = data.frame / Crafty.timer.getFPS();
				time *= 2*3.14159;
				var fontsize = 20 + Math.sin(time);
				title.css({"font-size": fontsize + "pt"});
//				console.log("It is: " + data.frame);
			})
			.bind("Click", function(event)
			{
				Crafty.scene("mapedit");
			});
	});
	
	Crafty.scene("mapedit", function()
	{
//		var iso = Crafty.isometric.size(32).centerAt(10, 10);
		var letter = function(number)
		{
			if (number >= 0 && number < 26)
			{
				return String.fromCharCode(number + "A".charCodeAt(0));
			}
			else if (number >= 26 && number < 52)
			{
				return String.fromCharCode(number + "a".charCodeAt(0));
			}
			else if (number >= 52 && number < 62)
			{
				return String.fromCharCode(number + "0".charCodeAt(0));
			}
			else if (number == 62)
			{
				return "#";
			}
			else if (number == 63)
			{
				return "+";
			}
			else throw "Invalid input to letter function";
		}
		
		var base64 = function(map)
		{
			// assume size
			var base64 = "AKI";
			var number = 0;
			
			for (var i = 0; i < map.length; ++i)
			{
				switch (i % 6)
				{
					case 0: 
					case 1: 
					case 2: 
					case 3:
					case 4:
						number = (map[i].color() == 'black') ? 0 : 1;
						number<<=1;
						break;
					case 5:										
						number = (map[i].color() == 'black') ? 0 : 1;
						base64 += letter(number);
						break;					
				}
				
				console.log(number);
			}
			
			return base64;	
		}
		

		
		
		var map = Array();
		map.length = 11*9;
		
		
		var handler = function()
		{
			if (this.color() == 'red')
				this.color('black');
			else this.color('red');
			
			console.log(base64(map));
		}
		

		for (var i = 0; i < 11; ++i)
			for (var j = 0; j < 9; ++j)

				map[i + j * 11] = Crafty.e('2D, DOM, Color, Text, Mouse')
					.css({"line-height": "30px",
					      "text-align": "center",
					      "font-size": "15px"})
					.color('red')
					.attr({w: 45, h:45, x: i * 48 + 7, y: j * 48 + 7})
					.text("50")
					.bind("Click", handler);
					
		var clearboxes = function(map)
		{
			for (var i = 0; i < map.length; ++i)
			{
				map[i].color('black');
			}
			
			console.log(base64(map));
		}
		
		var fillboxes = function(map)
		{
			for (var i = 0; i < map.length; ++i)
			{
				map[i].color('red');
			}
			
			console.log(base64(map));
		}
		
	
		Crafty.e('2D, DOM, Color, Text, Mouse')
			.css({"line-height": "45px",
			      "text-align": "center",
			      "font-size": "15px",
			      "color": "white",
			      "font-weight" : "bold"})
			.color('blue')
			.attr({w: 45*2, h:45, x: 11 * 48 + 7, y: 0 * 48 + 7})
			.text("Clear")
			.bind("Click", function(){ clearboxes(map); });

		Crafty.e('2D, DOM, Color, Text, Mouse')
			.css({"line-height": "45px",
			      "text-align": "center",
			      "font-size": "15px",
			      "color": "white",
			      "font-weight" : "bold"})
			.color('blue')
			.attr({w: 45*2, h:45, x: 11 * 48 + 7, y: 1 * 48 + 7})
			.text("Fill")
			.bind("Click", function(){ fillboxes(map); });

				
//				iso.place(i, j, 0, Crafty.e('2D, DOM, Color').color('red').attr({w:32, h:32}));
		
		
	});
	
	Crafty.scene("loading");
}
