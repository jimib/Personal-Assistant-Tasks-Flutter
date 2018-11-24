import 'package:flutter/material.dart';

class {{name}} extends StatefulWidget {
  
  _{{name}}State createState() => _{{name}}State();
}

class _{{name}}State extends State<{{name}}> {
  //add any persistent data here
  //AnimationController _animation;

  @override
  initState(){
    super.initState();
    //add init code
    //_animation = AnimationController();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
       child: Text('{{name}}'),
    );
  }
}