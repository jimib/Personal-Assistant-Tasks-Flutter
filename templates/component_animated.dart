import 'package:flutter/material.dart';

class {{name}} extends StatefulWidget {
  _{{name}}State createState() => _{{name}}State();
}

class _{{name}}State extends State<{{name}}> with SingleTickerProviderStateMixin {
  //add any persistent data here
  AnimationController _animation;

  @override
  initState(){
    super.initState();
    //add init code
    _animation = AnimationController(
      vsync: this,
      lowerBound: 0.0,
      upperBound: 1.0,
      value: 0.0,
      duration: Duration(seconds:1)
    );
  }

  @override
  Widget build(BuildContext context) {
    return _{{name}}Animation(
       listenable: _animation
    );
  }
}

class _{{name}}Animation extends AnimatedWidget {
  const _{{name}}Animation({Key key, @required Listenable listenable}) : super(key: key, listenable: listenable);

  @override
  Widget build(BuildContext context) {
    Animation animation = listenable;
    return Transform.rotate(
      angle: animation.value,
      child: Text('_{{name}}Animation')
    );
  }
}